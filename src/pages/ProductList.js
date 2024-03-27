import "../css/ProductList.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "./jwt.js";

import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const itemsPerPage = 6; // 페이지당 보여줄 상품 수

  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/product/all", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    navigate(`/products/${newPage}`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filteredProducts);
    }
  };

  const handleSortByLatest = () => {
    setSortBy("latest");
    setFilteredProducts((prevProducts) =>
      prevProducts.slice().sort((a, b) => b.id - a.id)
    );
  };

  const handleSortByPopular = () => {
    setSortBy("popular");
    //인기도 순으로 상품을 정렬
  };

  return (
    <div>
      <TopBar />
      <div className="sortButtons">
        <button onClick={handleSortByLatest}>최신순</button>
        <button onClick={handleSortByPopular}>인기순</button>
      </div>

      <div className="findProduct">
        <input
          type="text"
          placeholder="상품명 검색"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="productList">
        {currentProducts.map((product) => (
          <div key={product.id} className="productItem">
            {/* 링크 추가 */}
            <Link to={`/detail/${product.id}`} style={{ textDecoration: "none"}}>
              {product.imgUrl && (
                <img
                  src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.imgUrl}`}
                  alt={product.productName}
                />
              )}
              <p style={{ color: "black"}}>상품명 : {product.productName}</p>
              <p style={{ color: "black"}}>가격 : {product.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <div>
        {/* 페이지네이션 */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));

  // 상품을 찾지 못한 경우에 대한 처리
  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>{product.name} 상세 페이지</h2>
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (currentPage > 1) {
      navigate(`/products/${currentPage - 1}`);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      navigate(`/products/${currentPage + 1}`);
    }
  };

  const renderPageNumbers = () => {
    const maxVisiblePages = 5; // 최대 페이지 조절
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }
    } else {
      const leftOffset = Math.max(
        currentPage - Math.floor(maxVisiblePages / 2),
        1
      );
      const rightOffset = Math.min(
        leftOffset + maxVisiblePages - 1,
        totalPages
      );

      for (let i = leftOffset; i <= rightOffset; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }

      if (leftOffset > 1) {
        pageNumbers.unshift(<span key="leftEllipsis">...</span>);
      }

      if (rightOffset < totalPages) {
        pageNumbers.push(<span key="rightEllipsis">...</span>);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && <span onClick={handlePrevClick}>&lt;</span>}

      {renderPageNumbers()}

      {currentPage < totalPages && <span onClick={handleNextClick}>&gt;</span>}
    </div>
  );
};

export { ProductList, ProductDetail };

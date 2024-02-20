import "../css/ProductList.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import exProductURL from "../images/exProduct.jpg";

import "./TopBar.js";
import TopBar from "./TopBar.js";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "가나다",
      images: [exProductURL],
    },
    {
      id: 2,
      name: "라마바",
      images: [exProductURL],
    },
    {
      id: 3,
      name: "가",
      images: [exProductURL],
    },
    {
      id: 4,
      name: "마",
      images: [exProductURL],
    },
    {
      id: 5,
      name: "가마",
      images: [exProductURL],
    },
    {
      id: 6,
      name: "상품 6",
      images: [exProductURL],
    },
    {
      id: 7,
      name: "상품 7",
      images: [exProductURL],
    },
    {
      id: 8,
      name: "상품 8",
      images: [exProductURL],
    },
    {
      id: 9,
      name: "상품 9",
      images: [exProductURL],
    },
  ]);
  const itemsPerPage = 6; // 페이지당 보여줄 상품 수

  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    navigate(`/products/${newPage}`);
  };

  const [filteredProducts, setFilteredProducts] = useState([]); // 검색된 상품 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [sortBy, setSortBy] = useState(""); // 'latest' 또는 'popular'

  useEffect(() => {
    setFilteredProducts(products); // 초기에는 전체 상품 목록을 보여줌
  }, [products]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // 검색어를 소문자로 변환하여 저장
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // 검색어가 비어있지 않은 경우 필터링된 상품 목록을 설정
    if (searchTerm.trim() !== "") {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filteredProducts);
    } else {
      // 검색어가 비어있는 경우 전체 상품 목록을 보여줌
      setFilteredProducts(products);
    }
  };

  const handleSortByLatest = () => {
    setSortBy("latest");
    setProducts((prevProducts) =>
      prevProducts.slice().sort((a, b) => b.id - a.id)
    );
  };

  const handleSortByPopular = () => {
    setSortBy("popular");
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
          onKeyPress={handleKeyPress} // 이 부분 추가
        />
      </div>

      <div className="productList">
        {currentProducts.map((products) => (
          <div key={products.id} className="productItem">
            <Link to={`/product/${products.id}`}>
              <img src={products.images[0]} alt={products.name} />
            </Link>
            <p>{products.name}</p>
            <p>가격</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));
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

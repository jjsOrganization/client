import "../css/ProductList.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import exProductURL from "../images/exProduct.jpg";
import axiosInstance from "./jwt.js";

import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";

const PortpolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const itemsPerPage = 6; // 페이지당 보여줄 포트폴리오(작업물)

  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/portfolio/all", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response.data.data);
        setPortfolios(response.data.data);
        setFilteredPortfolios(response.data.data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredPortfolios.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    navigate(`/products/${newPage}`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();                // 오류
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
        filteredPortfolios(portfolios);
    } else {
      const filteredPortfolios = portfolios.filter((portfolio) =>
        portfolio.explanation.toLowerCase().includes(searchTerm)        // 오류
      );
      setFilteredPortfolios(filteredPortfolios);
    }
  };

  const handleSortByLatest = () => {
    setSortBy("latest");
    setFilteredPortfolios((prevProducts) =>
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
          placeholder="포트폴리오 (작업물) 검색"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="productList">
        {currentProducts.map((portfolio) => (
          <div key={portfolio.id} className="productItem">
            {/* 링크 추가 */}
            <Link to={`/detail/${portfolio.id}`} style={{ textDecoration: "none"}}>
              {portfolio.designerImagePath && (
                <img
                  src={`${portfolio.designerImagePath}`}
                  alt={portfolio.desginerName}
                />
              )}
              <p style={{ color: "black"}}>디자이너 : {portfolio.designerName}</p>
              <p style={{ color: "black"}}>설명 : {portfolio.explanation}</p>
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

export default PortpolioList;
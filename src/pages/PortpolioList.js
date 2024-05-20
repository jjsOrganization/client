import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import Pagination from "../component/Pagination.js";

const PortpolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/portfolio/reformOutput/list", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response.data.data);
        setPortfolios(response.data.data);
        setFilteredPortfolios(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
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
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredPortfolios(portfolios);
    } else {
      const filteredPortfolios = portfolios.filter((portfolio) =>
        portfolio.explanation.toLowerCase().includes(searchTerm)
      );
      setFilteredPortfolios(filteredPortfolios);
    }
  };

  const handleSortByLatest = () => {
    setFilteredPortfolios((prevProducts) =>
      prevProducts.slice().sort((a, b) => b.id - a.id)
    );
  };

  const handleSortByPopular = () => {
    // 인기도 순으로 정렬 로직 추가 필요
  };

  return (
    <div>
      <TopBar />
      {/* <div className="sortButtons">
        <button onClick={handleSortByLatest}>최신순</button>
        <button onClick={handleSortByPopular}>인기순</button>
      </div> */}

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
          <div key={portfolio.title} className="productItem">
            <Link to={`/designer/portpolio/${portfolio.progressNumber}`} style={{ textDecoration: "none" }}>
              {portfolio.completeImgUrl && (
                <img
                  src={portfolio.completeImgUrl}
                  alt={portfolio.designerName}
                />
              )}
              <p style={{ color: "black" }}>제목 : {portfolio.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PortpolioList;
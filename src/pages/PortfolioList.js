import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import Pagination from "../component/Pagination.js";
import '../css/DesignerPortfolio.module.css'
import useProgressStore from '../store.js';


const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;
  let [progressNumber, setProgressNumber] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/portfolio/reformOutput/list", {
        });
        console.log(response.data.data);
        setPortfolios(response.data.data);
        setFilteredPortfolios(response.data.data);
        setProgressNumber(response.data.data)
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
          style = {{marginBottom : '3%'}}
        />
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {currentProducts.map((portfolio , index) => (
            <a
            key = {portfolio.id}
            className="group"
            style={{ textDecoration: "none" }}
            >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <Link to={`/reformCompleted/${progressNumber[index].progressNumber}`} style={{ textDecoration: "none" }}>
              {portfolio.completeImgUrl && (
                <div
                  style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={portfolio.completeImgUrl}
                  alt={portfolio.designerName}
                  style={{ width: "350px", height: "350px" }}
                />
                </div>
              )}
              <p style={{ color: "black" }}>
                제목 : {portfolio.title}
              </p>
            </Link>
          </div>
        </a>
        ))}
      </div>
    </div>
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

export default PortfolioList;
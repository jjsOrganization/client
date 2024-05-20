import "../css/DesignerSearch.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import Pagination from "../component/Pagination.js";

const PortpolioSearch = () => {
  const [designers, setDesigners] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";

  const navigate = useNavigate();
  const { progressNumber, page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/portfolio/reformOutput/detail/${progressNumber}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setDesigners(response.data.data);
        setFilteredDesigners(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [progressNumber]);

  const totalPages = Math.ceil(filteredDesigners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDesigners = filteredDesigners.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    navigate(`/designers/${newPage}`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredDesigners(designers);
    } else {
      const filteredDesigners = designers.filter((designer) =>
        designer.designerName.toLowerCase().includes(searchTerm)
      );
      setFilteredDesigners(filteredDesigners);
    }
  };

  return (
    <div>
      <TopBar />
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search designers..."
        />
      </div>
      <div className="designer-list">
        {currentDesigners.map((designer) => (
          <div key={designer.id} className="designer-card">
            <img src = {Endpoint + reformData.productImgUrl} alt={designer.title} />
            <h3>{designer.designerName}</h3>
            <p>{designer.title}</p>
            <p>{designer.category}</p>
            <p>{designer.price}</p>
            <p>{designer.explanation}</p>
            <div className="image-gallery">
              <img src={designer.reformRequestImgUrl} alt="Reform Request" />
              <img src={designer.estimateImgUrl} alt="Estimate" />
              <img src={designer.completeImgUrl} alt="Complete" />
            </div>
            <p>Working Period: {designer.workingperiod}</p>
            <p>Date: {new Date(designer.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortpolioSearch;
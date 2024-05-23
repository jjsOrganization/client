import "../css/DesignerSearch.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";

const PortpolioSearch = () => {
  const [designers, setDesigners] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";

  const navigate = useNavigate();
  const { progressNumber, page } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/portfolio/reformOutput/detail/${progressNumber}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setDesigners(response.data.data);
        setFilteredDesigners(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [progressNumber]);

  const handlePageChange = (newPage) => {
    navigate(`/designers/${newPage}`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();

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
      <div className="designer-list">
        <div key={designers.id} className="designer-card">
          <img src={Endpoint + designers.productImgUrl} alt={designers.title} />
          <h3>{designers.designerName}</h3>
          <p>{designers.title}</p>
          <p>{designers.category}</p>
          <p>{designers.price}</p>
          <p>{designers.explanation}</p>
          <div className="image-gallery">
            <img src={designers.reformRequestImgUrl} alt="Reform Request" />
            <img src={designers.estimateImgUrl} alt="Estimate" />
            <img src={designers.completeImgUrl} alt="Complete" />
          </div>
          <p>Working Period: {designers.workingperiod}</p>
          <p>Date: {new Date(designers.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PortpolioSearch;

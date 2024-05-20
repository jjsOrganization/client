import axiosInstance from "../component/jwt.js";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import TopBar from "../component/TopBar.js";

function DesignerSelect() {
  const [designersList, setDesignersList] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const { designerName } = useParams();

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await axiosInstance.get("/portfolio/all", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = response.data.data;
        setDesignersList(data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };

    fetchDesigners();
  }, []);

  useEffect(() => {
    if (designerName && designersList.length > 0) {
      const filtered = designersList.filter(
        (designer) =>
          designer.designerName.toLowerCase() === designerName.toLowerCase()
      );
      setFilteredDesigners(filtered);
    } else {
      setFilteredDesigners(designersList);
    }
  }, [designerName, designersList]);

  if (designersList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TopBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>디자이너 자기소개</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredDesigners.map((designer, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                justifyContent: "center",
              }}
            >
              <img
                src={designer.designerImagePath}
                alt={`${designer.designerName} 이미지`}
                style={{ width: "250px", height: "250px", marginRight: "20px" }}
              />
              <div>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {designer.designerName}
                </p>
                <p>{designer.explanation}</p>
              </div>
            </li>
          ))}
        </ul>
        {filteredDesigners.map((designer, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <img
              src={designer.priceImagePath}
              alt={`${designer.designerName} 이미지`}
              style={{ width: "500px", height: "500px" }}
            />
          </li>
        ))}
      </div>
    </div>
  );
}

export default DesignerSelect;

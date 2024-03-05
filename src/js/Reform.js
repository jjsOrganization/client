import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "./TopBar.js";
import TopBar from "./TopBar.js";

import "./DesignerSelect.js";
import DesignerSelect from "./DesignerSelect.js";

import "../pages/Detail.js";
import Detail from "../pages/Detail.js";

import { Routes, Route, useNavigate } from "react-router-dom";

let RegisterBtn = styled.button`
  color: white;
  background: black;
`;

function Reform() {
  const [titleValue, setTitleValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [thumbnailImage, setThumbnailImage] = useState();
  const [thumbnailImageFile, setThumbnailImageFile] = useState();
  const [designer, setDesigners] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [searchResults, setSearchResults] = useState([]); // 결과값

  const savecontent = (event) => {
    setContentValue(event.target.value);
  };

  const saveAmount = (event) => {
    setAmountValue(event.target.value);
  };

  const savePrice = (event) => {
    setPriceValue(event.target.value);
  };

  const saveTitle = (event) => {
    setTitleValue(event.target.value);
  };

  const encodeImageFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const encodeImageUrl = encodeURIComponent(reader.result);
      setThumbnailImage(encodeImageUrl);
      setThumbnailImageFile(file);
    };
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-CSRF-TOKEN": localStorage.getItem("csrfToken"),
    },
  });

  const registerHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", titleValue);
      formData.append("price", priceValue);
      formData.append("itemDetail", contentValue);
      formData.append("productStock", amountValue);
      formData.append("productImgDtoList.imgUrl", thumbnailImage);
      formData.append("itemImgFile", thumbnailImageFile);

      const response = await axiosInstance.post(
        "/product/seller/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-CSRF-TOKEN": localStorage.getItem("csrfToken"),
          },
        }
      );
      console.log("상품 등록 성공:", response.data);
      window.location.replace(`/productupdate`);
      alert("상품이 등록되었습니다.");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  const handleSearch = () => {
    // 새 창 열기
    const newWindow = window.open("/designerSelect", "");
  };

  const handleDesignerSelect = (selectedDesigner) => {
    // 선택한 디자이너 정보를 처리하는 로직을 여기에 작성
    console.log("선택한 디자이너:", selectedDesigner);
  };

  return (
    <div>
      <TopBar />
      <div style={{ marginLeft: "20%", marginRight: "20%" }}>
        <div style={{ marginTop: "5%", marginLeft: "7%" }} ClassName="title">
          <h3>리폼요청</h3>
        </div>
        <div
          className="image"
          style={{
            height: "300px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={thumbnailImage}
            height="90%"
            style={{ marginTop: "1.8%" }}
          ></img>
        </div>

        <div className="productRegisterContainer">
          <div
            className="productRegisterImageUpdate"
            style={{
              justifyItems: "end",
              display: "grid",
              marginBottom: "30px",
            }}
          >
            <label
              htmlFor="fileInput"
              className="inputLabel"
              style={{
                padding: "10px",
                margin: "5px 0 20px 0",
                fontWeight: "bold",
                color: "red",
                cursor: "pointer",
                display: "inline-block",
                border: "1px solid red",
              }}
            >
              사진 업로드
            </label>

            <input
              id="fileInput"
              type="file"
              multiple
              onChange={(event) => encodeImageFile(event)}
              style={{ display: "none" }}
            />
          </div>

          <div className="designer">
            <p style={{ fontWeight: "700", margin: "0" }}>디자이너</p>
            {/* 검색 버튼 */}
            <button onClick={handleSearch}>디자이너 선택</button>
            {/* 디자이너 목록 */}
            {filteredDesigners.map((designer) => (
              <div key={designer.id} style={{ cursor: "pointer" }}>
                {designer.name}
              </div>
            ))}
          </div>

          <div className="content">
            <p style={{ fontWeight: "700", margin: "0" }}>리폼요청 사항</p>
            <input
              value={contentValue}
              type="text"
              onChange={savecontent}
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </div>
          <div className="price">
            <p style={{ fontWeight: "700", margin: "0" }}>리폼 가격</p>
            <input
              value={priceValue}
              type="text"
              onChange={savePrice}
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </div>
          <div className="amount">
            <p style={{ fontWeight: "700", margin: "0" }}>기타</p>
            <input
              value={amountValue}
              type="text"
              onChange={saveAmount}
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </div>
          <div className="register" style={{ textAlign: "right" }}>
            <RegisterBtn
              onClick={() => {
                registerHandler();
              }}
            >
              리폼요청
            </RegisterBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reform;

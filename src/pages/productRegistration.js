import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "../js/TopBar.js";
import TopBar from "../js/TopBar.js";
import Dropdown from "../component/dropdown";

let RegisterBtn = styled.button`
  color: white;
  background: black;
`;

function ProductUpdate(props) {
  const [titleValue, setTitleValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [thumbnailImage, setThumbnailImage] = useState();
  const [thumbnailImageFile, setThumbnailImageFile] = useState();
  const [category, setCategory] = useState();

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
      setThumbnailImage(reader.result);
      setThumbnailImageFile(file);
    };
  };


  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

  const [productRegister, setProductRegister] = useState([]);

  
  useEffect(() => {
  const fetchCategoryData = async () => {
    try {
      const response = await axiosInstance.get(`/products/category/1`, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      setCategory(response.data);
    } catch (error) {
      console.log('카테고리 데이터 로드 실패', error);
    }
  };
  fetchCategoryData();
}, []);

  useEffect(() => {
    if(category){
      console.log(category)
    }
  })

  return (
    <div>
      <TopBar />
      <div style={{ marginTop: "5%", marginLeft: "7%" }} ClassName="title">
        <h3>상품등록</h3>
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
          style={{ justifyItems: "end", display: "grid", marginBottom: "30px" }}
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
        <div className="productRegisterTitle">
          <p style={{ fontWeight: "700", margin: "0" }}>상품 제목</p>
          <input
            value={titleValue}
            type="text"
            onChange={saveTitle}
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </div>
        <div className="productRegisterContent">
          <p style={{ fontWeight: "700", margin: "0" }}>상품 정보</p>
          <input
            value={contentValue}
            type="text"
            onChange={savecontent}
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </div>
        <div className="productRegisterPrice">
          <p style={{ fontWeight: "700", margin: "0" }}>상품 가격</p>
          <input
            value={priceValue}
            type="text"
            onChange={savePrice}
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </div>
        <div className="productRegisterAmount">
          <p style={{ fontWeight: "700", margin: "0" }}>재고수</p>
          <input
            value={amountValue}
            type="text"
            onChange={saveAmount}
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </div>
        <div className = 'productRegisterCategory'>
          <Dropdown/>
        </div>
        <div className="productRegisterBtn" style={{ textAlign: "right" }}>
          <RegisterBtn
            onClick={() => {
              registerHandler();
            }}
          >
            상품등록
          </RegisterBtn>
        </div>
        
      </div>
    </div>
  );
}

export default ProductUpdate;

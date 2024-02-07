import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import StockList from "./stockList";

import "../js/TopBar.js";
import TopBar from "../js/TopBar.js";

let RegisterBtn = styled.button`
  color: white;
  background: black;
`;

function StockUpdater() {
  const [test, setTest] = useState([
    {
      id: 0,
      title: "White and Black",
      content: "Born in France",
      price: 120000,
    },

    {
      id: 1,
      title: "Red Knit",
      content: "Born in Seoul",
      price: 110000,
    },

    {
      id: 2,
      title: "Grey Yordan",
      content: "Born in the States",
      price: 130000,
    },
  ]);

  const [titleValue, setTitleValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [thumbnailImage, setThumbnailImage] = useState();

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

  const register = () => {
    setTest((prevArray) => [
      ...prevArray,
      { title: titleValue, content: contentValue, price: priceValue },
    ]);
    setTitleValue("");
    setContentValue("");
    setPriceValue("");
  };

  const encodeImageFile = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event);

    return new Promise((resolve) => {
      reader.onload = () => {
        setThumbnailImage(reader.result);

        resolve();
      };
    });
  };

  const [productRegister, setProductRegister] = useState([]);

  return (
    <div>
      <TopBar />
      <div style={{ marginTop: "5%", marginLeft: "7%" }} ClassName="title">
        <h3>상품수정</h3>
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
        <img src={thumbnailImage}></img>
      </div>

      <div className="stockUpdataContainer">
        <div
          className="stockImageUpdate"
          style={{ justifyItems: "end", display: "grid", marginBottom: "30px" }}
        >
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
              사진 수정
            </label>

            <input
              id="fileInput"
              type="file"
              multiple
              onChange={(event) => {
                encodeImageFile(event.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="stockUpdataTitle">
          <p style={{ fontWeight: "700", margin: "0" }}>
            {" "}
            {test[0].title}상품 제목
          </p>
          <input
            value={titleValue}
            type="text"
            onChange={saveTitle}
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </div>
        <div className="content">
          <p style={{ fontWeight: "700", margin: "0" }}>상품 정보</p>
          <input
            value={contentValue}
            type="text"
            onChange={savecontent}
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </div>
        <div className="price">
          <p style={{ fontWeight: "700", margin: "0" }}>상품 가격</p>
          <input
            value={priceValue}
            type="text"
            onChange={savePrice}
            style={{ width: "100%", marginBottom: "30px" }}
          />
        </div>
        <div className="amount">
          <p style={{ fontWeight: "700", margin: "0" }}>재고수</p>
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
              register();
            }}
          >
            상품 수정
          </RegisterBtn>
        </div>
      </div>
    </div>
  );
}

export default StockUpdater;

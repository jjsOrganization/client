import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Dropdown from "../component/dropdown";
import copyType from "../component/dropdown";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "../js/TopBar.js";
import TopBar from "../js/TopBar.js";

let BasicBtn = styled.button`
  padding: 1%;
  background: black;
  color: white;
  width: 30%;
`;

function Detail(props) {
  const [myArray, setMyArray] = useState([]);
  let [sale, setSale] = useState(0.25);
  let [total, setTotal] = useState(0);
  const [dropdownVisibility, setDropdownVisibility] = React.useState(false);
  let { productid } = useParams();
  const [productidInt, setProductidInt] = useState();
  const [productDetailInfo, setProductDetailInfo] = useState();
  const [salePrice, setSalePrice] = useState();

  //Dropdown 관련 변수
  const SizeList = ["S", "M", "L", "XL"];
  const ColorList = ["검정", "아이보리", "그레이", "챠콜"];
  const size = "Size";
  const color = "Color";
  const test = total * salePrice;
  const [choiceSize, setChoiceSize] = useState(null);
  const [choiceColor, setChoiceColor] = useState(null);

  const addValue = () => {
    setMyArray((prevArray) => [
      ...prevArray,
      { size: choiceSize, color: choiceColor },
    ]);
    setChoiceColor(null);
    setChoiceSize(null);
  };

  useEffect(() => {
    if (choiceSize && choiceColor) {
      addValue();
      setTotal(total + 1);
    }
  }, [choiceSize, choiceColor]);

  useEffect(() => {
    setProductidInt(parseInt(productid));
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/all/detail/${productid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-CSRF-TOKEN": localStorage.getItem("csrfToken"),
          },
        });
        setProductDetailInfo(response.data);
      } catch (error) {
        console.log("상품 상세 데이터 로드 실패", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (productDetailInfo) {
      console.log(productDetailInfo);
      console.log(productDetailInfo.productName);
      setSalePrice(productDetailInfo.price * (1 - sale));
    } else {
      console.log("상품 데이터가 아직 로드되지 않았습니다.");
    }
  }, [productDetailInfo, sale]);

  if (!productDetailInfo) {
    return <div>데이터를 로드하는 중입니다...</div>;
  }

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `/cart/purchaser/add/${productid}`,
        {
          id: productDetailInfo.id,
          itemDetail: productDetailInfo.itemDetail,
          price: productDetailInfo.price,
          productImg: productDetailInfo.productImg,
          productName: productDetailInfo.productName,
          productSellStatus: productDetailInfo.productSellStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-CSRF-TOKEN": localStorage.getItem("csrfToken"),
          },
        }
      );
      console.log("장바구니에 상품 추가:", response.data);
      // 크롬 알림표시 사용 예정
    } catch (error) {
      console.error("장바구니에 상품 추가 실패:", error);
    }
  };

  const reFormLink = `/reform?productId=${productid}`;

  return (
    <div>
      <TopBar />
      <div className="Detail" style={{ marginLeft: "20%", marginRight: "20%" }}>
        <div
          className="image"
          style={{
            display: "flex",
            marginBottom: "3%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src="https://i.postimg.cc/zfrVFgNL/1.png"
            width="300px"
            height="300px"
          />
          <div
            className="productinfo"
            style={{
              display: "inline",
              position: "relative",
              flexDirection: "column",
              flexGrow: 1,
              marginLeft: "2%",
            }}
          >
            <h4 className="title">{productDetailInfo.productName}</h4>
            <p
              style={{
                fontWeight: "bold",
                textDecoration: "line-through",
                color: "darkgray",
              }}
            >
              {productDetailInfo.price}
            </p>
            <p style={{ fontWeight: "800", color: "red" }}>{sale * 100}%</p>
            <p style={{ fontWeight: "bold" }}>
              할인가 : {salePrice && salePrice.toLocaleString()}{" "}
            </p>
            <div
              className="btn"
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                bottom: "0",
                w0th: "100%",
                width: "100%",
              }}
            >
              <BasicBtn
                onClick={() => {
                  total === 0
                    ? alert("사이즈와 색상을 선택해 주세요")
                    : alert("구매 완료");
                  window.location.replace(`/detail/${productid}`);
                }}
              >
                구매하기
              </BasicBtn>
              <BasicBtn>
                <Link to={reFormLink}>의뢰하기</Link>
              </BasicBtn>
              <BasicBtn onClick={addToCart}>장바구니</BasicBtn>
            </div>
          </div>
        </div>

        <div className="productField">
          <p>{productDetailInfo.itemDetail}</p>
        </div>

        <div className="buy-info" style={{ display: "flex" }}>
          <div
            className="dropdown"
            style={{ display: "flex", marginTop: "3%" }}
          >
            <Dropdown
              text={size}
              setArticleType={setChoiceSize}
              articleType={choiceSize}
              articleTypeList={SizeList}
            />
            <Dropdown
              text={color}
              setArticleType={setChoiceColor}
              articleType={choiceColor}
              articleTypeList={ColorList}
            />
          </div>
          <div className="buy-info" style={{ marginLeft: "7%" }}>
            <h3>제품명 : {productDetailInfo.productName}</h3>
            <p style={{ marginBottom: "2%" }}>
              결제 예정 금액 : {test.toLocaleString()}{" "}
            </p>
            <p>수량 : {total}</p>
            <div classNale="selectOpt">
              {myArray.map(function (choice, index) {
                return (
                  <div
                    className="user-choice"
                    style={{ w0th: "180px", marginBottom: "10px" }}
                  >
                    {choice.size + choice.color}{" "}
                    <button className="choice-cancel">✖</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;

import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Dropdown from "../component/dropdown";
import copyType from "../component/dropdown";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
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
  let { productid } = useParams();
  let salePrice = props.productDetailInfo[productid].price * (1 - sale);
  let [total, setTotal] = useState(0);
  const [dropdownVisibility, setDropdownVisibility] = React.useState(false);


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
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/all/detail/${productid}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'X-CSRF-TOKEN': localStorage.getItem('csrfToken'),
          }
        });
        props.setproductDetailInfo(response.data); // 수정된 부분
      } catch(error) {
        console.log('데이터 로드 실패', error);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="Detail">
      <TopBar />
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
          <h4 className="title">{props.productDetailInfo[productid].title}</h4>
          <p>{props.productDetailInfo[productid].content}</p>
          <p
            style={{
              fontWeight: "bold",
              textDecoration: "line-through",
              color: "darkgray",
            }}
          >
            {props.productDetailInfo[productid].price.toLocaleString()}
          </p>
          <p style={{ fontWeight: "800", color: "red" }}>{sale * 100}%</p>
          <p style={{ fontWeight: "bold" }}>
            할인가 : {salePrice.toLocaleString()}
          </p>
          <div
            className="btn"
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "absolute",
              bottom: "0",
              wproductidth: "100%",
              width : '100%'
            }}
          >
            <BasicBtn
              onClick={() => {
                total === 0
                  ? alert("사이즈와 색상을 선택해 주세요")
                  : alert("구매 완료");
                window.location.replace(`/detail/${productid}`);
              }}>구매하기</BasicBtn>
            <BasicBtn>의뢰하기</BasicBtn>
            <BasicBtn>장바구니</BasicBtn>
          </div>
        </div>
      </div>

      <div className="productField">
        <p>
          <h1>대충 상품 정보 적혀있는 칸 </h1>
        </p>
      </div>

      <div className="buy-info" style={{ display: "flex" }}>
        <div className="dropdown" style={{ display: "flex", marginTop: "3%" }}>
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
          <h3>제품명 : {props.productDetailInfo[productid].title}</h3>
          <p style={{ marginBottom: "2%" }}>
            결제 예정 금액 : {test.toLocaleString()}{" "}
          </p>
          <p>수량 : {total}</p>
          <div classNale="selectOpt">
            {myArray.map(function (choice, index) {
              return (
                <div
                  className="user-choice"
                  style={{ wproductidth: "180px", marginBottom: "10px" }}
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
  );
}



export default Detail;



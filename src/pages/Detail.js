import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Dropdown from "../component/dropdown";
import axiosInstance from "./jwt.js";
import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";
import LikeComponent from "../component/likeComponent.js";
import Kakao from "../component/kakaoMap.js";

let BasicBtn = styled.button`
  padding: 1%;
  background: black;
  color: white;
  width: 30%;
`;

function Detail(props) {
  let navigate = useNavigate();
  const [myArray, setMyArray] = useState([]);
  let [sale, setSale] = useState(0.25);
  let [total, setTotal] = useState(0);
  let { productid } = useParams();
  const [productDetailInfo, setProductDetailInfo] = useState();
  const [sellerData, setSellerData] = useState();
  const [salePrice, setSalePrice] = useState();
  const [productLike, setProductLike] = useState();
  const [likeState, setLikeState] = useState(false);
  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";

  //Dropdown 관련 변수
  const SizeList = ["S", "M", "L", "XL"];
  const ColorList = ["검정", "아이보리", "그레이", "챠콜"];
  const size = "Size";
  const color = "Color";
  const test = total * salePrice;
  const [choiceSize, setChoiceSize] = useState(null);
  const [choiceColor, setChoiceColor] = useState(null);

  const kakaoMapStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    width: "250px",
    marginLeft: "15%",
  };

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

  //상품 상세 데이터 get
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/all/detail/${productid}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProductDetailInfo(response.data);
      } catch (error) {
        console.log("상품 상세 데이터 로드 실패", error);
      }
    };
    fetchDetailData();
  }, []);

  //판매자 데이터 get (매장 위치 표시위한)
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const sellerInfo = await axiosInstance.get(
          `/product/all/detail/${productid}/seller`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setSellerData(sellerInfo.data);
      } catch (error) {
        console.log("판매자 데이터 로드 실패", error);
      }
    };
    fetchSellerData();
  }, []);

  //할인가 계산 및 좋아요 유무에 판단을 위함
  useEffect(() => {
    if (productDetailInfo && productLike) {
      setSalePrice(productDetailInfo.price * (1 - sale));
    }
    console.log(productDetailInfo);
  }, [productDetailInfo, sale]);

  const handleLike = async () => {
    try {
      if (likeState) {
        await axiosInstance.delete(`/product/all/detail/${productid}/like`);
      } else {
        await axiosInstance.post(`/product/all/detail/${productid}/like`);
      }
      const likeStateInfo = await axiosInstance.get(
        `/product/all/detail/${productid}/like-status`
      );
      setLikeState(likeStateInfo.data.data);
      productLikeGet();
    } catch (error) {
      console.log("좋아요 처리 에러", error);
    }
  };

  useEffect(() => {
    productLikeGet();
  }, []);

  const productLikeGet = async () => {
    try {
      const productLikeCount = await axiosInstance.get(
        `/product/all/detail/${productid}/like-count`
      );
      setProductLike(productLikeCount.data.data);
    } catch (error) {
      console.log("좋아요 get에러", error);
    }
  };

  //상품 좋아요 여부 확인
  useEffect(() => {
    const LikeCheckGet = async () => {
      try {
        const likeStateInfo = await axiosInstance.get(
          `/product/all/detail/${productid}/like-status`
        );
        setLikeState(likeStateInfo.data.data);
      } catch (error) {
        console.log("좋아요 상태 체크 에러", error);
      }
    };
    LikeCheckGet();
  }, []);

  if (!productDetailInfo) {
    return <div>데이터를 로드하는 중입니다...</div>;
  }

  const addToCart = async () => {
    try {
      const response = await axiosInstance.post(
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

  const handleOrder = async () => {
    try {
      const orderDTO = {
        orderDetails: [
          {
            productId: productDetailInfo.id,
            quantity: 1,
          },
        ],
        postcode: "",
        address: "",
        detailAddress: "",
        phoneNumber: "",
        deliveryRequest: "",
      };

      await axiosInstance.post(`/product/purchaser/order`, orderDTO, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // 페이지 이동
      navigate("/PurchaserInfo");
    } catch (error) {
      console.log("주문 실패", error);
    }
  };

  const reFormLink = `/reform?productId=${productid}`;

  return (
    <div>
      <TopBar />
      <div
        className="Detail"
        style={{
          marginRight: "20%",
          marginLeft: "20%",
        }}
      >
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
            src={Endpoint + productDetailInfo.productImg[0].imgUrl}
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
            <div className="productLikeContainer" style={{ marginTop: "-3%" }}>
              <LikeComponent
                setLikeState={setLikeState}
                likeState={likeState}
                Likeresult={productLike}
                productLikeGet={productLikeGet}
                handleLike={handleLike}
              />{" "}
              {productLike}{" "}
            </div>
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
              <BasicBtn onClick={handleOrder}>주문하기</BasicBtn>
              <BasicBtn>
                <Link
                  to={reFormLink}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  의뢰하기
                </Link>
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
            <h4>제품명 : {productDetailInfo.productName}</h4>
            <p style={{ marginBottom: "2%" }}>
              결제 예정 금액 : {test.toLocaleString()}{" "}
            </p>
            <p>수량 : {total}</p>
            <div className="selectOpt">
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

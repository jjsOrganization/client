import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Dropdown from "../component/dropdown";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import LikeComponent from "../component/likeComponent.js";
import Modal from "react-modal";
import {TailWindButton} from "../component/atoms/Button.js"
import { useBtnStore } from "../store.js";

function Detail(props) {
  let navigate = useNavigate();
  const [myArray, setMyArray] = useState([]);
  let [sale, setSale] = useState(0.25);
  let [amount, setAmount] = useState(0);
  let { productid } = useParams();
  const [productDetailInfo, setProductDetailInfo] = useState();
  const [salePrice, setSalePrice] = useState();
  const [productLike, setProductLike] = useState();
  const [likeState, setLikeState] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";
  const SizeList = ["S", "M", "L", "XL"];
  const ColorList = ["검정", "아이보리", "그레이", "챠콜"];
  const size = "Size";
  const color = "Color";
  const test = amount * salePrice;
  const [choiceSize, setChoiceSize] = useState(null);
  const [choiceColor, setChoiceColor] = useState(null);
  const {borderSkyBlue} = useBtnStore(state => state)
  

  let BasicBtn = styled.button`
  padding: 1%;
  background: black;
  color: white;
  width: 30%;
  `;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      setAmount(amount + 1);
    }
  }, [choiceSize, choiceColor]);

  //상품 상세 데이터 get
  const fetchDetailData = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/all/detail/${productid}`,
        );
        setProductDetailInfo(response.data);
        setSalePrice(productDetailInfo.price * sale)
      } catch (error) {
      }
    };

  const productLikeGet = async () => {
    try {
      const productLikeCount = await axiosInstance.get(
        `/product/all/detail/${productid}/like-count`
      );
      setProductLike(productLikeCount.data.data);
    } catch (error) {
    }
  };
  
  const memberRoleCheck = (els) => {
    if(localStorage.getItem('role') !== 'ROLE_PURCHASER'){
      alert('일반 회원으로 로그인 해주세요')
    }
    else{
      els()
    }
  }
  
  const getAllProductInfo = () => {
    return Promise.all([fetchDetailData(),productLikeGet()]);
  };

  useEffect(() => {
    getAllProductInfo();
  }, []);

  useEffect(() => {
    if(productDetailInfo){
      setSalePrice(productDetailInfo.price * (1 - sale));
    }
  },[productDetailInfo])

  const handleLike = async () => {
    try {
      if (localStorage.getItem('role') != 'ROLE_PURCHASER') {
        return alert('일반 회원만 가능한 기능입니다.')
      }else if(likeState) {
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
    }
  };
  
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
        },)
      openModal();
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
      await axiosInstance.post(`/product/purchaser/order`, orderDTO,);
      navigate("/PurchaserInfo");
    } catch (error) {
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
        marginLeft: "20%",}}
      >
        <div
          className="image"
          style={{
          display: "flex",
          marginBottom: "3%",
          width: "100%",
          height: "100%",}}
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
              marginLeft: "2%",}}
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
              할인가 : {salePrice }{" "}
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
            <div className="btn"
              style={{
              display: "flex",
              justifyContent: "space-between",
              bottom: "0",
              w0th: "100%",
              width: "100%",
              }}>
              <BasicBtn onClick={() => {memberRoleCheck(handleOrder)}}>
                주문하기
              </BasicBtn>
              <BasicBtn onClick={() => memberRoleCheck(() => navigate(reFormLink))}>
                의뢰하기
              </BasicBtn>
              <BasicBtn onClick={() => {memberRoleCheck(addToCart)}}>
                장바구니
              </BasicBtn>
            </div>
          </div>
        </div>
        <div className="buyInfoContainer" style={{ display: "flex" }}>
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
          <div className="buyInfo" style={{ marginLeft: "7%" }}>
            <h4>제품명 : {productDetailInfo.productName}</h4>
            <p style={{ marginBottom: "2%" }}>
              결제 예정 금액 : {test.toLocaleString()}{" "}
            </p>
            <p>수량 : {amount}</p>
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
        <div className="productField">
          {productDetailInfo.productImg.slice(1).map((image, index) => (
            <img
            key={index}
            src={Endpoint + image.imgUrl}
            width="75%"
            height="100%"
            style = {{margin : '0 0 3% 12%'}}
            />
          ))}
        </div>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          display : 'block',
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1000 },
          content: {
            width: "35%",
            height: "20%",
            margin: "auto",
            border: "3px solid",
            borderRadius: "5px",
            zIndex: 1001,
            borderColor: "#374d9a",
          },
        }}>
            <TailWindButton
              className = {`${borderSkyBlue} ml-20 mt-10`}
              onClick = {closeModal} >
              쇼핑 계속하기
            </TailWindButton>

            <TailWindButton
              className={`${borderSkyBlue} ml-10`}
              onClick = {() => {navigate('/PurchaserMyPage')}}>
              장바구니 이동
            </TailWindButton>
        </Modal>
      </div>
    </div>
  );
}

export default Detail;

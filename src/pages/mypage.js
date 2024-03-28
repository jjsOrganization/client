import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../pages/jwt.js";
import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";

const BtnStyle = styled.button`
  color: white;
  background: black;
`;

function MyPages() {
  const customStyles = {
    overlay: {
      zIndex: 1000,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";
  const StockNavigate = useNavigate();
  const productupdateNavigate = useNavigate();
  const [registerData, setRegisterData] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [soldProduct, setSoldProduct] = useState();
  const [allData, setAllData] = useState();

  const productDeleteHandler = async (i) => {
    try {
      const deleteProduct = await axiosInstance.delete(
        `/product/seller/register/${registerData[i].id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-CSRF-TOKEN": localStorage.getItem("csrfToken"),
          },
        }
      );
      alert("상품 삭제 완료");
      window.location.replace(`/mypage2`);
    } catch (error) {
      console.log("상품삭제실패", error);
    }
  };

  useEffect(() => {
    const fetchRegisterData = async () => {
      try {
        const registerResponse = await axiosInstance.get(
          "/product/seller/register",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const soldProductResponse = await axiosInstance.get(
          `/order/seller-list`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setRegisterData(registerResponse.data);
        setSoldProduct(soldProductResponse.data.data);
        console.log(soldProductResponse.data.data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };
    fetchRegisterData();
  }, []);

  //판매자 정보 조회
  useEffect(() => {
    const fetchSellerData = async (i) => {
      try {
        const sellerResponse = await axiosInstance.get("/seller/info", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setSellerData(sellerResponse.data.data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };
    fetchSellerData();
  }, []);

  return (
    <div className="mypageContainer">
      <TopBar />
      <h3>마이페이지</h3>
      <div
        className="mypageProductList"
        style={{ display: "flex", marginBottom: "-28px" }}
      >
        <p style={{ display: "inline" }}>상품목록</p>
        <p
          style={{ marginLeft: "auto" }}
          onClick={() => {
            productupdateNavigate("/productupdate");
          }}
        >
          상품등록
        </p>
      </div>
      <div>
        {registerData.length >= 1 ? (
          <MypageProductList
            Endpoint={Endpoint}
            productDeleteHandler={productDeleteHandler}
            registerData={registerData}
            navigate={StockNavigate}
          />
        ) : (
          <h2
            style={{
              display: "flex",
              height: "300px",
              marginTop: "2%",
              justifyContent: "center",
              alignItems: "center",
              color: "darkgrey",
            }}
          >
            상품을 등록해주세요
          </h2>
        )}
      </div>
      <p style={{ marginTop: "3%", marginBottom: "-12px", display: "flex" }}>
        판매 상품
      </p>
      <hr></hr>
      {!soldProduct <= 1 ? (
        "판매된 상품이 존재하지 않습니다"
      ) : (
        <div
          className="mypageSoldList"
          style={{ marginTop: "-4px", display: "flex" }}
        >
          {soldProduct[0].orderDetails[0].price}
        </div>
      )}
    </div>
  );
}

function MypageProductList(props) {
  return (
    <div>
      {props.registerData.map(function (image, i) {
        return (
          <>
            <hr style={{ marginBottom: "10px" }}></hr>
            <div
              className="stockItemContainer"
              key={i}
              style={{ display: "flex", marginBottom: "10px" }}
            >
              <div className="image" style={{ marginBottom: "-16px" }}>
                <img
                  src={props.Endpoint + props.registerData[i].imgUrl}
                  width="100px"
                  height="100px"
                />
              </div>

              <div
                className="productInfoContainer"
                style={{
                  width: "400px",
                  fontWeight: "700",
                  marginLeft: "10%",
                  display: "inline",
                }}
              >
                <div className="title">
                  <h3>{props.registerData[i].productName}</h3>
                </div>
                <div className="" style={{ display: "flex" }}>
                  재고수 : {props.registerData[i].productStock}
                </div>
                <div
                  className="BtnStyle"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <BtnStyle
                    style={{ marginRight: "5%" }}
                    onClick={() => {
                      props.navigate(
                        `/stockupdater/${props.registerData[i].id}`
                      );
                    }}
                  >
                    상품 수정
                  </BtnStyle>

                  <BtnStyle
                    onClick={() => {
                      props.productDeleteHandler(i);
                    }}
                  >
                    상품 삭제
                  </BtnStyle>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <hr></hr>
    </div>
  );
}

export default MyPages;

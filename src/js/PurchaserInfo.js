import React, { useState } from "react";
import axiosInstance from "./jwt.js";
import TopBar from "./TopBar.js";
import "../css/PurchaserInfo.css";
import { useNavigate } from "react-router-dom";


function PurchaserInfo() {
  let navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState({
    postCode: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
    deliveryRequest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  const handleOrder = async () => {
    try {
      await axiosInstance.put(`/cart/purchaser/order`, orderInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("구매가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.log("주문 실패", error);
    }
  };

  return (
    <div>
      <TopBar />
      <h1>구매자 정보 입력</h1>
      <div className="purchaserInfo">
        <h4>배송지 정보 입력</h4>
        <div>
          <div className="postCode">
            <label>
              <span>우편번호</span>
              <input
                name="postCode"
                value={orderInfo.postCode}
                onChange={handleChange}
                placeholder="우편번호를 입력해주세요."
              />
            </label>
          </div>

          <div className="address">
            <label>
              <span>주소</span>
              <input
                name="address"
                value={orderInfo.address}
                onChange={handleChange}
                placeholder="주소를 입력해주세요."
              />
            </label>
          </div>

          <div className="detailAddress">
            <label>
              <span>상세 주소</span>
              <input
                name="detailAddress"
                value={orderInfo.detailAddress}
                onChange={handleChange}
                placeholder="상세 주소를 입력해주세요."
              />
            </label>
          </div>

          <div className="phoneNumber">
            <label>
              <span>휴대전화</span>
              <input
                name="phoneNumber"
                value={orderInfo.phoneNumber}
                onChange={handleChange}
                placeholder="휴대전화 번호를 입력해주세요."
              />
            </label>
          </div>

          <div className="deliveryRequest">
            <label>
              <span>배송요청 사항</span>
              <input
                name="deliveryRequest"
                value={orderInfo.deliveryRequest}
                onChange={handleChange}
                placeholder="배송요청 사항을 입력해주세요."
              />
            </label>
          </div>
        </div>

        <div>
          <button className="basketOrderButton" onClick={handleOrder}>
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaserInfo;

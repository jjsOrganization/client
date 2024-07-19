import React, { useState } from "react";
import axiosInstance from "../component/jwt.js";
import "../css/PurchaserInfo.css";
import { useNavigate } from "react-router-dom";
import PurchaserInfo_Template from "../component/template/PurchaserInfo_Template.js";

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
    } catch (error) {}
  };
  return(
    <div>
        <PurchaserInfo_Template 
        handleChange = {handleChange}
        handleOrder = {handleOrder}
        orderInfo = {orderInfo}
        label={"주문하기"}
        />
    </div>
  );
};

export default PurchaserInfo;
import React, { useState, useEffect } from "react";
import axiosInstance from "./jwt.js";
import "../css/PurchaserAddressEdit.css";

function PurchaserAddressEdit() {

  const [addressData, setAddressData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`/auth/update-purchaser/address`, addressData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data) {
        window.alert("주소가 성공적으로 변경되었습니다.");
      } else {
        window.alert("주소 변경에 실패했습니다.");
      }
    } catch (error) {
      window.alert("주소변경 중 오류가 발생했습니다.");
    }
  };

  return (
   <div className="purchaserAddressEdit">
      <h1>주소 변경</h1>
      <form onSubmit={handleSubmit}>
        <div className="newAddress">
          <label>새 주소:</label>
          <input
            type="text"
            name="address"
            value={addressData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">주소 변경 완료</button>
      </form>
    </div>
  );
}

export default PurchaserAddressEdit;

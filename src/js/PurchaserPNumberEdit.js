import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/PurchaserPNumberEdit.css"

function PurchaserPNumberEdit() {

  const [PNumberData, setPNumberData] = useState({
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPNumberData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/auth/update/phoneNumber`, PNumberData, {
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
    <div className="purchaserPNumberEdit">
      <h1>전화번호 변경</h1>
      <form onSubmit={handleSubmit}>
        <div className="newPNumber">
          <label>새 전화번호:</label>
          <input
            type="text"
            name="phoneNumber"
            value={PNumberData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">전화번호 변경 완료</button>
      </form>
    </div>
  );
}

export default PurchaserPNumberEdit;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/PurchaserPasswordEdit.css";

function PurchaserPasswordEdit() {

  const [passwordData, setPasswordData] = useState({
    password: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/auth/update/password`, passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data) {
        window.alert("비밀번호가 성공적으로 변경되었습니다.");
        // 성공 시 필요한 처리
      } else {
        window.alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      window.alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="purchaserPasswordEdit">
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit}>
        <div className="newPassword">
          <label>새 비밀번호:</label>
          <input
            type="password"
            name="password"
            value={passwordData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newRePassword">
          <label>새 비밀번호 확인:</label>
          <input
            type="password"
            name="rePassword"
            value={passwordData.rePassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">비밀번호 변경 완료</button>
      </form>
    </div>
  );
}

export default PurchaserPasswordEdit;

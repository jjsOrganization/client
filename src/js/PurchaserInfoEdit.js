import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar.js";
import "../css/PurchaserInfoEdit.css";

function PurchaserInfoEdit() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    rePassword: "",
    phoneNumber: "",
    address: "",
  });

  const openPasswordChangePopup = () => {
    window.open(
      "/mypage/PurchaserPasswordEdit",
      "PasswordChange",
      "width=400,height=400"
    );
  };

  const openAddressChangePopup = () => {
    window.open(
      "/mypage/purchaserAddressEdit",
      "AddressChange",
      "width=400,height=400"
    );
  };

  const openPNumberChangePopup = () => {
    window.open(
      "/mypage/purchaserPNumberEdit",
      "AddressChange",
      "width=400,height=400"
    );
  };

  return (
    <div>
      <TopBar />
      <div className="purchaserInfoEdit">
        <h1>회원정보 수정</h1>
        <h5>수정 정보</h5>
        <div className="purchaserInfoE">
          <span className="purchaserInfo">비밀번호</span>
          <button onClick={openPasswordChangePopup}>비밀번호 변경</button>

          <span className="purchaserInfo">휴대전화</span>
          <button onClick={openPNumberChangePopup}>휴대전화 변경</button>

          <span className="purchaserInfo">주소</span>
          <button onClick={openAddressChangePopup}>주소 변경</button>
        </div>

        <div className="Submitbutton">
          <button type="submit">수정완료</button>
        </div>
      </div>
    </div>
  );
}

export default PurchaserInfoEdit;

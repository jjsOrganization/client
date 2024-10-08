import React, { useState } from "react";
import TopBar from "../component/TopBar.js";
import "../css/PurchaserInfoEdit.css";

function PurchaserInfoEdit() {

  const openPasswordChangePopup = () => {
    window.open(
      "/Mypage/PurchaserInfoEdit/PurchaserPasswordEdit",
      "PasswordChange",
      "width=400,height=400"
    );
  };

  const openAddressChangePopup = () => {
    window.open(
      "/Mypage/PurchaserInfoEdit/PurchaserAddressEdit",
      "AddressChange",
      "width=400,height=400"
    );
  };

  const openPNumberChangePopup = () => {
    window.open(
      "/Mypage/PurchaserInfoEdit/PurchaserPNumberEdit",
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

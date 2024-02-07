import React, { useState } from "react";
import "../css/Login.css";
import axiosInstance from "./jwt.js";

function Login({ selectedTab, setSelectedTab }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTabClick = (tabNumber) => {
    setSelectedTab(tabNumber);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        memberId: userEmail,
        password: password,
      });
      if (response.data && response.data.data.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        document.cookie = `accessToken=${response.data.data.accessToken}; path=/;`;
        console.log("로그인 성공");
        console.log(document.cookie);
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      window.alert('이메일 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.');
      console.error("Error :", error);
    }
  };

  const getLoginType = () => {
    switch (selectedTab) {
      case 1:
        return "user";
      case 2:
        return "seller";
      case 3:
        return "designer";
      default:
        return "";
    }
  };

  return (
    <div className="Login">
      <div className="logo">
        <h4>LOGO</h4>
      </div>
      <div className="rectangle">
        <div
          className={`tab ${selectedTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          구매자
        </div>
        <div
          className={`tab ${selectedTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          판매자
        </div>
        <div
          className={`tab ${selectedTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          디자이너
        </div>
      </div>
      <div className="loginForm">
        <div className="loginInputs">
          <label>
            이메일 :
            <input className="loginEmail"
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
          <label>
            비밀번호 :
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="loginButton">
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="findButtons">
          <button>회원가입</button>
          <button>아이디 찾기</button>
          <button>비밀번호 찾기</button>
        </div>
        <p>선택된 로그인 유형설명 : {getLoginType()}</p>
      </div>
    </div>
  );
}

export default Login;

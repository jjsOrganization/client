import React, { useState } from "react";
import "../css/Login.css";
import axiosInstance from "./jwt.js";
import { useNavigate } from "react-router-dom";

function Login({ selectedTab, setSelectedTab }) {
  let navigate = useNavigate();
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
        localStorage.setItem('memberId',userEmail);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem('csrfToken', response.data.data.csrfToken);
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        document.cookie = `csrfToken'=${response.data.data.csrfToken}; path = /;`;
        document.cookie = `accessToken=${response.data.data.accessToken}; path=/;`;
        console.log(document.cookie);
        console.log("로그인 성공");
        navigate("/");
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      window.alert("이메일 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.");
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
            <input
              className="loginEmail"
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
          {/* 회원가입 버튼 클릭시 회원가입 페이지로 이동 시키려고 넣어놓긴 했는데 회원가입 페이지 누락돼서 링크는 못적음 */}
          <button
            onClick={() => {
              navigate("");
            }}
          >
            회원가입
          </button>
          <button>아이디 찾기</button>
          <button>비밀번호 찾기</button>
        </div>
        <p>선택된 로그인 유형설명 : {getLoginType()}</p>
      </div>
    </div>
  );
}

export default Login;

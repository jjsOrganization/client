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
        localStorage.setItem('memberId', userEmail);
        localStorage.setItem("accessToken", response.data.data.accessToken);
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

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    handleLogin(); // 로그인 시도
  };

  return (
    <div className="Login">
      <div className="logo">
        <h4>LOGO</h4>
      </div>
      {/* <div className="rectangle">
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
      </div> */}
      <div className="loginForm">
        <form onSubmit={handleSubmit}> {/* form 요소와 onSubmit 이벤트 핸들러 추가 */}
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
            <button type="submit">Login</button> {/* 폼 제출 버튼으로 변경 */}
          </div>
        </form>
        <div className="findButtons">
          <button onClick={() => { navigate("/signup"); }}>회원가입</button>
          <button>아이디 찾기</button>
          <button>비밀번호 찾기</button>
        </div>
      </div>
      {/* <p>선택된 로그인 유형설명 : {getLoginType()}</p> */}
    </div>
  );
}

export default Login;
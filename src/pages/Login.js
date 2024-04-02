import React, { useState } from "react";
import "../css/Login.css";
import axiosInstance from "../component/jwt.js";
import { useNavigate } from "react-router-dom";
import Logo from "../images/로고01.png"

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
        localStorage.setItem("memberId", userEmail);
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

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
                style={{
                  color: "#374D9A",
                }}
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{
                    borderRadius: "0.4rem",
                    backgroundColor: "#F3F4F6",
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                  type="password"
                  style={{
                    color: "#374D9A",
                  }}
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {/* Forgot password? */}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  style={{
                    borderRadius: "0.4rem",
                    backgroundColor: "#F3F4F6",
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            회원이 아니신가요?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              회원가입 하러가기
            </a>
          </p>
        </div>
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
      {/* <div className="loginForm">
        <form onSubmit={handleSubmit}>
          {" "}
          {form 요소와 onSubmit 이벤트 핸들러 추가}
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
            <button type="submit">Login</button> {폼 제출 버튼으로 변경}
          </div>
        </form>
        <div className="findButtons">
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </button>
          <button>아이디 찾기</button>
          <button>비밀번호 찾기</button>
        </div>
      </div> */}
      {/* <p>선택된 로그인 유형설명 : {getLoginType()}</p> */}
    </div>
  );
}

export default Login;

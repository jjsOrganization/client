import React, { useState } from "react";
import axiosInstance from "../component/jwt.js";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useTokenStore } from "../store.js";

function Login() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useTokenStore((state) => state.setRefreshToken);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        memberId: userEmail,
        password: password,
      });
      if (response.data && response.data.data.accessToken) {
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        localStorage.setItem("memberId", userEmail);
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        document.cookie = `accessToken=${accessToken}; path=/;`;
        console.log(`로그인시 저장한 쿠키 ${document.cookie}`)
        navigate("/");
      } else {
      }
    } catch (error) {
      window.alert("이메일 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container">
        <div className="Login">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-full flex justify-center">
              <img className="h-25 w-40" src={logo} alt="Your Company" />
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
        </div>
      </div>
    </div>
  );
}

export default Login;

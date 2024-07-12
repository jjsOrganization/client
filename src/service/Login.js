import React, { useState } from "react";
import LoginTemplate from "../component/template/Login_Template.js";
import { postAxios } from "../component/Axios.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const request = await postAxios("/auth/login", {
        memberId: email,
        password: password,
      });
      console.log(request);
      if (request.data && request.data.data.accessToken) {
        localStorage.setItem("memberId", email);
        localStorage.setItem("accessToken", request.data.data.accessToken);
        localStorage.setItem("refreshToken", request.data.data.refreshToken);
        document.cookie = `accessToken=${request.data.data.accessToken}; path=/;`;
        navigate("/");
      } else {
        window.alert("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      window.alert("이메일 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.");
    }
  };

  return (
    <LoginTemplate
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default Login;

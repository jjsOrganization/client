import React, { useState } from "react";
import LoginTemplate from "../component/template/Login_Template.js";
import { postAxios } from "../component/Axios.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import store from "../store";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: handleLogin } = useMutation({
    mutationFn: () =>
      postAxios("/auth/login", {
        memberId: email,
        password: password,
      }),
    onSuccess: (request) => {
      console.log(request);
      localStorage.setItem("memberId", email);
      localStorage.setItem("accessToken", request.data.data.accessToken);
      localStorage.setItem("refreshToken", request.data.data.refreshToken);
      document.cookie = `accessToken=${request.data.data.accessToken}; path=/;`;
      alert("환영합니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <LoginTemplate
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleSubmit}
    />
  );
};

export default Login;

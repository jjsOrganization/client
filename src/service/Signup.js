import React, { useState } from "react";
import Signup_Template from "../component/template/Signup_Template.js";
import { useNavigate } from "react-router-dom";
import { postAxios } from "../component/Axios";

const Signup = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
    phoneNumber: "",
    address: "",
    userSep: "purchaser",
    businessNumber: "",
    storeAddress: "",
    storeName: "",
  });

  const [userType, setUserType] = useState("purchaser");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const request = await postAxios(`/auth/join-${userType}`, formData);
      console.log(request);
      if (request.data) {
        window.alert("회원가입에 성공했습니다.");
        navigate("/");
      } else {
        window.alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      window.alert("이미 같은 정보가 있거나 잘못된 정보를 입력했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Signup_Template
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        userType={userType}
        setUserType={setUserType}
      />
    </div>
  );
};

export default Signup;

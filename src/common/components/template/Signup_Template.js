import React, { useState } from 'react';
import FormField from '../molecules/FormField';
import Tabs from '../molecules/Tabs';
import Button from '../atoms/Button';
import authService from '../services/authService';
import TopBar from '../components/TopBar';
import { useNavigate } from 'react-router-dom';

const SignupTemplate = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.signup(userType, formData);
      if (response.data) {
        window.alert("회원가입에 성공했습니다.");
        navigate("/login");
      } else {
        window.alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      window.alert("이미 같은 정보가 있거나 잘못된 정보를 입력했습니다.");
    }
  };

  return (
    <div>
      <TopBar />
      <div className="signUp">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <Tabs userType={userType} setUserType={setUserType} />
          <h5>기본정보</h5>
          <div>
            <FormField
              label="이메일"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일"
            />
            <FormField
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />
            <FormField
              label="비밀번호 확인"
              type="password"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />
            <FormField
              label="이름"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
            />
            <FormField
              label="휴대전화"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="핸드폰 번호"
            />
            <FormField
              label="주소"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="주소"
            />
            {userType === "seller" && (
              <>
                <FormField
                  label="사업자번호"
                  type="text"
                  name="businessNumber"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  placeholder="사업자번호"
                />
                <FormField
                  label="매장주소"
                  type="text"
                  name="storeAddress"
                  value={formData.storeAddress}
                  onChange={handleChange}
                  placeholder="매장주소"
                />
                <FormField
                  label="매장이름"
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="매장이름"
                />
              </>
            )}
          </div>
          <Button type="submit" label="가입하기" />
        </form>
      </div>
    </div>
  );
};

export default SignupTemplate;
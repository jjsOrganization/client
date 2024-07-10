import React, { useState } from "react";
import FormField from "../molecules/Signup/FormField";
import Tabs from "../molecules/Signup/Tabs";
import Button from "../atoms/Button";
import "../../css/Signup.css";

const SignupTemplate = ({ formData, handleChange, userType, setUserType, handleSubmit }) => {

  return (
    <div>
      <div className="signUp">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div className="SignUp1">
            <Tabs userType={userType} setUserType={setUserType} />
          </div>
          <h5>기본정보</h5>
          <div>
            {["purchaser", "seller", "designer"].includes(userType) && (
              <div>
                <div className="SignUp2">
                  <FormField
                    label="이메일"
                    type="text"
                    name="email"
                    placeholder="이메일"
                    className="SignUp3"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FormField
                    label="비밀번호"
                    type="text"
                    name="password"
                    placeholder="비밀번호"
                    className="SignUp3"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <FormField
                    label="비밀번호 확인"
                    type="text"
                    name="rePassword"
                    placeholder="비밀번호 확인"
                    className="SignUp3"
                    value={formData.rePassword}
                    onChange={handleChange}
                  />

                  <FormField
                    label="이름"
                    type="text"
                    name="name"
                    placeholder="이름"
                    className="SignUp3"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FormField
                    label="휴대전화"
                    type="text"
                    name="phoneNumber"
                    placeholder="휴대전화 번호 (-없이 입력하세요.)"
                    className="SignUp3"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />

                  <FormField
                    label="주소"
                    type="text"
                    name="address"
                    placeholder="주소"
                    className="SignUp3"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                {userType === "seller" && (
                  <div>
                    <div className="SignUp2">
                      <FormField
                        label="사업자번호"
                        type="text"
                        name="businessNumber"
                        placeholder="사업자번호"
                        className="SignUp3"
                        value={formData.businessNumber}
                        onChange={handleChange}
                      />

                      <FormField
                        label="매장주소"
                        type="text"
                        name="storeAddress"
                        placeholder="매장주소"
                        className="SignUp3"
                        value={formData.storeAddress}
                        onChange={handleChange}
                      />

                      <FormField
                        label="매장이름"
                        type="text"
                        name="storeName"
                        placeholder="매장이름"
                        className="SignUp3"
                        value={formData.storeName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="Submit-button">
            <button type="submit">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupTemplate;

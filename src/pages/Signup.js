import { useState } from "react";
import axiosInstance from "../component/jwt.js";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar.js";

function Signup() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const phoneRegex = /^010\d{8}$/;
    const phoneNumber = formData.phoneNumber
    if (!phoneRegex.test(phoneNumber)) {
      window.alert("전화번호 형식이 올바르지 않습니다.");
      return; 
    }
    try {
      const response = await axiosInstance.post(`/auth/join-${userType}`, formData);
      if (response.data) {
        window.alert("화원가입에 성공했습니다.");
        navigate("/login");
      } else {
        window.alert("화원가입에 실패했습니다.");
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
          <div className="SignUp1">
            <h5>회원구분</h5>
            <ul className="tabs">
              {["purchaser", "seller", "designer"].map((type) => (
                <li
                  className={`tab ${userType === type ? "active" : ""}`}
                  key={type}
                  onClick={() => setUserType(type)}
                >
                  <span className="SignUp4">
                    {type === "purchaser"
                      ? "일반회원"
                      : type === "seller"
                      ? "판매자"
                      : "디자이너"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <h5>기본정보</h5>
          <div>
            {["purchaser", "seller", "designer"].includes(userType) && (
              <div>
                <div className="SignUp2">
                  <label>
                    <span className="SignUp3">이메일</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일"
                    />
                  </label>

                  <label>
                    <span className="SignUp3">비밀번호</span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="비밀번호"
                    />
                  </label>

                  <label>
                    <span className="SignUp3">비밀번호 확인</span>
                    <input
                      type="password"
                      name="rePassword"
                      value={formData.rePassword}
                      onChange={handleChange}
                      placeholder="비밀번호 확인"
                    />
                  </label>

                  <label>
                    <span className="SignUp3">이름</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="이름"
                    />
                  </label>

                  <label>
                    <span className="SignUp3">휴대전화</span>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="핸드폰 번호"
                    />
                  </label>

                  <label>
                    <span className="SignUp3">주소</span>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="주소"
                    />
                  </label>
                </div>
                {userType === "seller" && (
                  <div>
                    <div className="SignUp2">
                      <label>
                        <span className="SignUp3">사업자번호</span>
                        <input
                          type="text"
                          name="businessNumber"
                          value={formData.businessNumber}
                          onChange={handleChange}
                          placeholder="사업자번호"
                        />
                      </label>

                      <label>
                        <span className="SignUp3">매장주소</span>
                        <input
                          type="text"
                          name="storeAddress"
                          value={formData.storeAddress}
                          onChange={handleChange}
                          placeholder="매장주소"
                        />
                      </label>

                      <label>
                        <span className="SignUp3">매장이름</span>
                        <input
                          type="text"
                          name="storeName"
                          value={formData.storeName}
                          onChange={handleChange}
                          placeholder="매장이름"
                        />
                      </label>
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
}

export default Signup;

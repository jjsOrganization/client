import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Signup.css";

function Signup() {
  const [userType, setUserType] = useState("purchaser");

  const [purchaserFormData, setPurchaserFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
    phoneNumber: "",
    address: "",
    userSep: "purchaser",
  });

  const [sellerFormData, setSellerFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
    phoneNumber: "",
    businessNumber: "",
    storeAddress: "",
    storeName: "",
    userSep: "seller",
  });

  const [designerFormData, setDesignerFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
    phoneNumber: "",
    address: "",
    userSep: "designer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (userType === "purchaser") {
      setPurchaserFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (userType === "seller") {
      setSellerFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (userType === "designer") {
      setDesignerFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userType === "purchaser") {
        await handleJoinPurchaser();
      } else if (userType === "seller") {
        await handleJoinSeller();
      } else if (userType === "designer") {
        await handleJoinDesigner();
      }
    } catch (error) {
      window.alert("회원가입에 실패했습니다. 다시 시도하세요.");
      console.error("Error :", error);
    }
  };

  const handleJoinPurchaser = async () => {
    try {
      const response = await axios.post(
        "/auth/join-purchaser",
        purchaserFormData
      );
      if (response.data) {
        console.log("회원가입 성공");
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      window.alert("회원가입에 실패했습니다. 다시 시도하세요.");
      console.error("Error :", error);
    }
  };

  const handleJoinSeller = async () => {
    try {
      const response = await axios.post("/auth/join-seller", sellerFormData);
      if (response.data) {
        console.log("회원가입 성공");
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      window.alert("회원가입에 실패했습니다. 다시 시도하세요.");
      console.error("Error :", error);
    }
  };

  const handleJoinDesigner = async () => {
    try {
      const response = await axios.post(
        "/auth/join-designer",
        designerFormData
      );
      if (response.data) {
        console.log("회원가입 성공");
      } else {
        console.error("회원가입 실패");
      }
    } catch (error) {
      window.alert("회원가입에 실패했습니다. 다시 시도하세요.");
      console.error("Error :", error);
    }
  };

  return (
    <div>
      <div className="signupTitle">
        <h4>회원가입</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="SignUp1">
          <span className="SignUp3">회원구분</span>
          <label>
            <input
              type="radio"
              name="userType"
              value="purchaser"
              checked={userType === "purchaser"}
              onChange={() => setUserType("purchaser")}
            />
            <span className="SignUp4">일반회원</span>
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="seller"
              checked={userType === "seller"}
              onChange={() => setUserType("seller")}
            />
            <span className="SignUp4">판매자</span>
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="designer"
              checked={userType === "designer"}
              onChange={() => setUserType("designer")}
            />
            <span className="SignUp4">디자이너</span>
          </label>
        </div>
        <div className="SignUp5">
          <h5>기본정보</h5>
        </div>
        <div>
          {userType === "purchaser" && (
            <div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">이메일</span>
                  <input
                    type="email"
                    name="email"
                    value={purchaserFormData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">비밀번호</span>
                  <input
                    type="password"
                    name="password"
                    value={purchaserFormData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">비밀번호 확인</span>
                  <input
                    type="password"
                    name="rePassword"
                    value={purchaserFormData.rePassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">이름</span>
                  <input
                    type="text"
                    name="name"
                    value={purchaserFormData.name}
                    onChange={handleChange}
                    placeholder="이름"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">휴대전화</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={purchaserFormData.phoneNumber}
                    onChange={handleChange}
                    placeholder="핸드폰 번호"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">주소</span>
                  <input
                    type="text"
                    name="address"
                    value={purchaserFormData.address}
                    onChange={handleChange}
                    placeholder="주소"
                  />
                </label>
              </div>
            </div>
          )}
          {userType === "seller" && (
            <div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">이메일</span>
                  <input
                    type="email"
                    name="email"
                    value={sellerFormData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">비밀번호</span>
                  <input
                    type="password"
                    name="password"
                    value={sellerFormData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">비밀번호 확인</span>
                  <input
                    type="password"
                    name="rePassword"
                    value={sellerFormData.rePassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">이름</span>
                  <input
                    type="text"
                    name="name"
                    value={sellerFormData.name}
                    onChange={handleChange}
                    placeholder="이름"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">휴대전화</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={sellerFormData.phoneNumber}
                    onChange={handleChange}
                    placeholder="핸드폰 번호"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">사업자번호</span>
                  <input
                    type="text"
                    name="businessNumber"
                    value={sellerFormData.businessNumber}
                    onChange={handleChange}
                    placeholder="사업자번호"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">매장주소</span>
                  <input
                    type="text"
                    name="storeAddress"
                    value={sellerFormData.storeAddress}
                    onChange={handleChange}
                    placeholder="매장주소"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">매장이름</span>
                  <input
                    type="text"
                    name="storeName"
                    value={sellerFormData.storeName}
                    onChange={handleChange}
                    placeholder="매장이름"
                  />
                </label>
              </div>
            </div>
          )}
          {userType === "designer" && (
            <div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">이메일</span>
                  <input
                    type="email"
                    name="email"
                    value={designerFormData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">비밀번호</span>
                  <input
                    type="password"
                    name="password"
                    value={designerFormData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">비밀번호 확인</span>
                  <input
                    type="password"
                    name="rePassword"
                    value={designerFormData.rePassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">이름</span>
                  <input
                    type="text"
                    name="name"
                    value={designerFormData.name}
                    onChange={handleChange}
                    placeholder="이름"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">휴대전화</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={designerFormData.phoneNumber}
                    onChange={handleChange}
                    placeholder="핸드폰 번호"
                  />
                </label>
              </div>
              <div className="SignUp2">
                <label>
                  <span className="SignUp3">주소</span>
                  <input
                    type="text"
                    name="address"
                    value={designerFormData.address}
                    onChange={handleChange}
                    placeholder="주소"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="Submit-button">
          <button type="submit">가입하기</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 추가된 부분: axios 불러오기
import "../css/TopBar.css";

function TopBar() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    }
});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      axios
        .get("/user/role", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setRole(response.data.data.role);
        })
        .catch((error) => {
          console.error("사용자 역할 가져오기 실패:", error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="loginMenu">
        {isLoggedIn ? (
          <p onClick={handleLogout}>로그아웃</p>
        ) : (
          <>
            <p onClick={() => navigate("/login")}>로그인</p>
            <p onClick={() => navigate("/signup")}>회원가입</p>
          </>
        )}
        {role === "ROLE_PURCHASER" && (
          <>
            <p onClick={() => navigate("/PurchaserMyPage")}>마이페이지</p>
            <p onClick={() => navigate("/shoppingbasket")}>장바구니</p>
          </>
        )}
        {role === "ROLE_SELLER" && (
          <>
            <p onClick={() => navigate("/mypage2")}>마이페이지</p>
          </>
        )}
        {role === "ROLE_DESIGNER" && (
          <>
            <p onClick={() => navigate("/DesignerMyPage")}>마이페이지</p>
          </>
        )}
      </div>
      <div className="topBarMenu">
        <p onClick={() => navigate("/products/1")}>상품검색</p>
        <p onClick={() => navigate("/DesignerSearch")}>디자이너검색</p>
        <p onClick={() => navigate("/")}>메인페이지</p>
        <p onClick={() => navigate("/visual")}>물 시각화</p>
        <p onClick={() => navigate("/PortpolioList")}>포트폴리오 (작업물)</p>
      </div>
    </div>
  );
}

export default TopBar;
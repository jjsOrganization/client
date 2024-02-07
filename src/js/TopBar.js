import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TopBar.css";

function TopBar() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 토큰 유무에 따라 로그인 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      {/* 상단바 CSS없이 일단 만들어서 연결만 시켜놓음 */}
      <div className="loginMenu" style={{ display: "flex" }}>
        {isLoggedIn ? (
          <p onClick={handleLogout}>로그아웃</p>
        ) : (
          <p onClick={() => navigate("/login")}>로그인</p>
        )}
        <p onClick={() => navigate("/mypage2")}>마이페이지</p>
        <p onClick={() => navigate("/shoppingbasket")}>장바구니</p>
      </div>
      <div className="topBarMenu" style={{ display: "flex" }}>
        <p onClick={() => navigate("/products/:page?")}>상품검색</p>
        <p onClick={() => navigate("/DesignerSearch")}>디자이너검색</p>
        <p onClick={() => navigate("/")}>메인페이지</p>
        <p onClick={() => navigate("/visual")}>물 시각화</p>
        <p onClick={() => navigate("/DesignerPortfolio")}>포트폴리오</p>
      </div>
    </div>
  );
}

export default TopBar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import "../css/TopBar.css";
import logo from "../images/logo.png";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { useTokenStore } from "../store.js";
import { useToken } from "antd/es/theme/internal.js";

export default function TopBar() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const clearTokens = useTokenStore((state) => state.clearTokens)
  const accessToken = useTokenStore((state) => state.accessToken)

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      axiosInstance
        .get("/user/role", {
          headers: {
            accessToken
          },
        })
        .then(async (response) => {
          setRole(response.data.data.role);
          localStorage.setItem("role", response.data.data.role);
        })
        .catch(async (error) => {
          console.error("요청 실패:", error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    clearTokens()
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-gray-100 mb-4">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">재고처리반</span>
            <img className="h-20 w-30" src={logo} alt="" />
          </a>
        </div>
        <Popover.Group className="flex flex-wrap justify-between gap-x-4 lg:gap-x-14 gap-y-2">
          <a
            href="/products"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900 flex-grow min-w-[70px] md:min-w-[100px]"
          >
            상품 검색
          </a>
          <a
            href="/designers"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900 flex-grow min-w-[70px] md:min-w-[100px]"
          >
            디자이너 검색
          </a>
          <a
            href="/visual"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900 flex-grow min-w-[70px] md:min-w-[100px]"
          >
            물 시각화
          </a>
          <a
            href="/PortfolioList"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900 flex-grow min-w-[70px] md:min-w-[100px]"
          >
            포트폴리오(작업물)
          </a>
        </Popover.Group>
        <div className="flex flex-1 justify-end flex-wrap gap-x-4 gap-y-2">
          {isLoggedIn ? (
            <div className="loginMenu flex flex-wrap gap-x-4 gap-y-2">
              {role === "ROLE_PURCHASER" && (
                <a
                  className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900"
                  onClick={() => navigate("/PurchaserMyPage")}
                >
                  마이페이지 <span aria-hidden="true">&rarr;</span>
                </a>
              )}
              {role === "ROLE_SELLER" && (
                <a
                  className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900"
                  onClick={() => navigate("/mypage")}
                >
                  마이페이지 <span aria-hidden="true">&rarr;</span>
                </a>
              )}
              {role === "ROLE_DESIGNER" && (
                <a
                  className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900"
                  onClick={() => navigate("/DesignerMyPage")}
                >
                  마이페이지 <span aria-hidden="true">&rarr;</span>
                </a>
              )}
              <a
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900"
                onClick={handleLogout}
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          ) : (
            <div className="loginMenu flex flex-wrap gap-x-4 gap-y-2">
              <a
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/login")}
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/signup")}
              >
                Sign in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
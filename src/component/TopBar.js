import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import "../css/TopBar.css";
import logo from "../images/logo.png"
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

export default function TopBar() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      axiosInstance.get("/user/role", {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
        })
        .then(async (response) => {
          setRole(response.data.data.role);
         localStorage.setItem('role',response.data.data.role)
        })
        .catch(async (error) => {
          console.error('요청 실패:', error);
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
    <header className="bg-gray-100 mb-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">재고처리반</span>
            <img className="h-20 w-30" src={logo} alt="" />
          </a>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/products" className="text-sm font-semibold leading-6 text-gray-900">
            상품 검색
          </a>
          <a href="/designers" className="text-sm font-semibold leading-6 text-gray-900">
            디자이너 검색
          </a>
          <a href="/visual" className="text-sm font-semibold leading-6 text-gray-900">
            물 시각화
          </a>
          <a href="PortpolioList" className="text-sm font-semibold leading-6 text-gray-900">
            포트폴리오(작업물)
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <div className="loginMenu">
              {role === "ROLE_PURCHASER" && (
                <>
                  <a className="text-sm font-semibold leading-6 text-gray-900 mr-4" onClick={() => navigate("/PurchaserMyPage")}>
                    마이페이지 <span aria-hidden="true" >&rarr;</span>
                  </a>
                </>
              )}
              {role === "ROLE_SELLER" && (
                <a className="text-sm font-semibold leading-6 text-gray-900 mr-4" onClick={() => navigate("/mypage")}>
                  마이페이지 <span aria-hidden="true">&rarr;</span>
                </a>
              )}
              {role === "ROLE_DESIGNER" && (
                <a className="text-sm font-semibold leading-6 text-gray-900 mr-4" onClick={() => navigate("/DesignerMyPage")}>
                  마이페이지 <span aria-hidden="true">&rarr;</span>
                </a>
              )}
              <a className="text-sm font-semibold leading-6 text-gray-900" onClick={handleLogout}>
                Log out <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          ) : (
            <div className="loginMenu">
              <a className="text-sm font-semibold leading-6 text-gray-900 mr-4" onClick={() => navigate("/login")}>
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
              <a className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate("/signup")}>
                Sign in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
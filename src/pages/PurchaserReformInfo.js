import React, { useEffect, useState } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import "../css/PurchaserInfo.css";
import { useNavigate, useParams } from "react-router-dom";

function PurchaserInfo() {
  let navigate = useNavigate();
  const { estimateNumber } = useParams();
  const [productPrice, setProductPrice] = useState(null);
  const [reformPrice, setReformPrice] = useState(null);
  const [totlaPrice, setTotalPrice] = useState(null);
  const [status, setStatus] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    postcode: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
    deliveryRequest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  const handleReform = async () => {
    try {
      await axiosInstance.patch(
        `/estimate/purchaser/acceptReformOrder/${estimateNumber}`,
        orderInfo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("견적서 승인이 완료되었습니다.");
      setStatus(true);
    } catch (error) {}
  };

  const handleReformFinal = async () => {
    try {
      await axiosInstance.patch(
        `/estimate/purchaser/acceptReformOrder/${estimateNumber}/complete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("견적서가 최종 승인이 완료되었습니다.");
      navigate("/");
    } catch (error) {}
  };

  const fetchPrice = async () => {
    try {
      const response = await axiosInstance.get(
        `/estimate/purchaser/acceptReformOrder/${estimateNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = response.data.data;
      setProductPrice(data.productPrice);
      setReformPrice(data.reformPrice);
      setTotalPrice(data.totalPrice);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <div>
      <TopBar />
      <h1 style={{ marginLeft: "15%", marginRight: "15%" }}>
        구매자 정보 입력
      </h1>
      <div className="purchaserInfo">
        <h4>배송지 정보 입력</h4>
        <div>
          <div className="totalPrice">
            <label>
              <span>상품 금액</span>
              <p>{productPrice}</p>
              <span>리폼 금액</span>
              <p>{reformPrice}</p>
              <span>총 금액</span>
              <p>{totlaPrice}</p>
            </label>
          </div>

          <div className="postCode">
            <label>
              <span>우편번호</span>
              <input
                name="postCode"
                value={orderInfo.postCode}
                onChange={handleChange}
                placeholder="우편번호를 입력해주세요."
              />
            </label>
          </div>

          <div className="address">
            <label>
              <span>주소</span>
              <input
                name="address"
                value={orderInfo.address}
                onChange={handleChange}
                placeholder="주소를 입력해주세요."
              />
            </label>
          </div>

          <div className="detailAddress">
            <label>
              <span>상세 주소</span>
              <input
                name="detailAddress"
                value={orderInfo.detailAddress}
                onChange={handleChange}
                placeholder="상세 주소를 입력해주세요."
              />
            </label>
          </div>

          <div className="phoneNumber">
            <label>
              <span>휴대전화</span>
              <input
                name="phoneNumber"
                value={orderInfo.phoneNumber}
                onChange={handleChange}
                placeholder="휴대전화 번호를 입력해주세요."
              />
            </label>
          </div>

          <div className="deliveryRequest">
            <label>
              <span>배송요청 사항</span>
              <input
                name="deliveryRequest"
                value={orderInfo.deliveryRequest}
                onChange={handleChange}
                placeholder="배송요청 사항을 입력해주세요."
              />
            </label>
          </div>
        </div>

        <div>
          {status === false ?  (
          <button className="basketOrderButton" onClick={handleReform}>
            배송정보 저장
          </button>
          ) : (
          <button className="basketOrderButton" onClick={handleReformFinal}>
            배송정보 최종승인
          </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaserInfo;

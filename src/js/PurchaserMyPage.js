import React, { useEffect, useState } from "react";
import "../css/PurchaserMyPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./TopBar.js";
import TopBar from "./TopBar.js";

function CustomerOrderList() {
  let navigate = useNavigate();

  const [purchaserOrderProducts, setPurchaserOrderProducts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await axios.get("/order/purchaser-list", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = response.data.data;
        console.log(data);
        setPurchaserOrderProducts(data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };

    fetchOrderList();
  }, []);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handlePurchaserInfoEdit = () => {
    navigate("/mypage/purchaserInfoEdit");
  };

  // 각 주문 상태에 대한 렌더링 함수
  function renderOrderStatus(orderStatus) {
    switch (orderStatus) {
      case "ORDER_COMPLETE":
        return "주문접수 완료";
      case "SHIPPING":
        return "배송중";
      case "DELIVERED":
        return "배송완료";
      case "CANCELLED":
        return "주문취소됨";
      case "REFUNDED":
        return "환불완료";
      default:
        return orderStatus;
    }
  }

  return (
    <div>
      <TopBar />
      <div className="purchaserOrderReformProduct">
        <h1>마이페이지</h1>
        <div className="purchaserOrederedProduct">
          <h4>구매목록</h4>
          <hr></hr>
          {purchaserOrderProducts
            .slice(0, showMore ? undefined : 2)
            .map((product) => (
              <div key={product.id}>
                <h5>
                  {product.orderDate[0]}년 {product.orderDate[1]}월{" "}
                  {product.orderDate[2]} 일
                </h5>
                <img
                  src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.imgUrl}`}
                  alt={product.name}
                />
                <p>주문상태 : {renderOrderStatus(product.orderStatus)}</p>
                <p>제품명 : {product.productName}</p>
                <p>수량 : {product.quantity}</p>
                <p>가격 : {product.price}원</p>
                <p>
                  배송현황 : {product.state}{" "}
                  <button
                    className="OrderedBTN"
                    onClick={() => {
                      navigate("/mypage/delivery");
                    }}
                  >
                    자세히
                  </button>
                </p>
                <hr></hr>
              </div>
            ))}
          {!showMore && (
            <button className="OrderedMoreBTN" onClick={handleShowMore}>
              더보기
            </button>
          )}
        </div>

        <div className="purchaserReformedProduct">
          <h4>리폼목록</h4>
          <hr></hr>
          {purchaserOrderProducts
            .slice(0, showMore ? undefined : 2)
            .map((product) => (
              <div key={product.id}>
                <h5>
                  {product.orderDate[0]}년 {product.orderDate[1]}월{" "}
                  {product.orderDate[2]} 일
                </h5>
                <img
                  src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.imgUrl}`}
                  alt={product.name}
                />
                <p>주문상태 : {renderOrderStatus(product.orderStatus)}</p>
                <p>제품명 : {product.productName}</p>
                <p>수량 : {product.quantity}</p>
                <p>가격 : {product.price}원</p>
                <p>
                  배송현황 : {product.state}{" "}
                  <button
                    className="OrderedBTN"
                    onClick={() => {
                      navigate("/mypage/delivery");
                    }}
                  >
                    자세히
                  </button>
                </p>
                <hr></hr>
              </div>
            ))}
          {!showMore && (
            <button className="OrderedMoreBTN" onClick={handleShowMore}>
              더보기
            </button>
          )}
        </div>
      </div>
      <div className="UserCorrection">
        <button onClick={handlePurchaserInfoEdit}>회원정보 수정하기</button>
      </div>
    </div>
  );
}

export default CustomerOrderList;
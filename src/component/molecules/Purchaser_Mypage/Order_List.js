import React from "react";
import Button from "../../atoms/Button.js";
import { useNavigate } from "react-router-dom";

const OrderList = ({
  purchaserOrderProducts = [],
  showMore,
  renderOrderStatus,
  handleShowMore,
}) => {
  let navigate = useNavigate();
  return (
    <div>
      <h1 style={{ marginLeft: "15%" }}>마이페이지</h1>
      <div className="purchaserOrederedProduct">
        <h4>구매목록</h4>
        <hr></hr>
        {purchaserOrderProducts
          .slice(0, showMore ? undefined : 2)
          .map((product, index) => (
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
                    navigate(`/mypage/delivery/${index}`);
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
  );
};

export default OrderList;

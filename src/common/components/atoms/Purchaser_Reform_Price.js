import React from "react";

function Price({ productPrice, reformPrice, totalPrice }) {
  return (
    <div className="priceDetails">
      <label>
        <span>상품 금액</span>
        <p>{productPrice}</p>
        <span>리폼 금액</span>
        <p>{reformPrice}</p>
        <span>총 금액</span>
        <p>{totalPrice}</p>
      </label>
    </div>
  );
}

export default Price;
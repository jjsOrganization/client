import React from "react";
import Input from "../atoms/Input";
import TopBar from "../TopBar";
import {Buttons} from "../atoms/Button";
import Label from "../atoms/Label";

const PurchaserReformInfo_Template = ({
  reformInfo,
  handleChange,
  handleReform,
  handleReformFinal,
  productPrice,
  reformPrice,
  totlaPrice,
  status
}) => {
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
              <Input
                name="postCode"
                value={reformInfo.postCode}
                onChange={handleChange}
                placeholder="우편번호를 입력해주세요."
              />
            </label>
          </div>

          <div className="address">
            <label>
              <span>주소</span>
              <Input
                name="address"
                value={reformInfo.address}
                onChange={handleChange}
                placeholder="주소를 입력해주세요."
              />
            </label>
          </div>

          <div className="detailAddress">
            <label>
              <span>상세 주소</span>
              <Input
                name="detailAddress"
                value={reformInfo.detailAddress}
                onChange={handleChange}
                placeholder="상세 주소를 입력해주세요."
              />
            </label>
          </div>

          <div className="phoneNumber">
            <label>
              <span>휴대전화</span>
              <Input
                name="phoneNumber"
                value={reformInfo.phoneNumber}
                onChange={handleChange}
                placeholder="휴대전화 번호를 입력해주세요."
              />
            </label>
          </div>

          <div className="deliveryRequest">
            <label>
              <span>배송요청 사항</span>
              <Input
                name="deliveryRequest"
                value={reformInfo.deliveryRequest}
                onChange={handleChange}
                placeholder="배송요청 사항을 입력해주세요."
              />
            </label>
          </div>
        </div>

        <div>
          {status === false ? (
            <Buttons className="basketOrderButton" onClick={handleReform}>
              배송정보 저장
            </Buttons>
          ) : (
            <Buttons className="basketOrderButton" onClick={handleReformFinal}>
              배송정보 최종승인
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};


export default PurchaserReformInfo_Template;
import react from "react";
import Input from "../atoms/Input";
import TopBar from "../TopBar";
import { Button } from "antd";

const PurchaserInfo_Template = ({
  orderInfo,
  handleChange,
  handleOrder,
  label
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
          <div className="postCode">
            <label>
              <span>우편번호</span>
              <Input
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
              <Input
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
              <Input
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
              <Input
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
              <Input
                name="deliveryRequest"
                value={orderInfo.deliveryRequest}
                onChange={handleChange}
                placeholder="배송요청 사항을 입력해주세요."
              />
            </label>
          </div>
        </div>

        <div>
            <Button 
            className="basketOrderButton"
            onClick={handleOrder}
            label={label}
            />
        </div>
      </div>
    </div>
  );
};


export default PurchaserInfo_Template;
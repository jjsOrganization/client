import React from "react";
import Input from "../atoms/Purchaser_Reform_Input";

function AddressForm({ orderInfo, handleChange }) {
  return (
    <>
      <Input
        label="우편번호"
        name="postcode"
        value={orderInfo.postcode}
        onChange={handleChange}
        placeholder="우편번호를 입력해주세요."
      />
      <Input
        label="주소"
        name="address"
        value={orderInfo.address}
        onChange={handleChange}
        placeholder="주소를 입력해주세요."
      />
      <Input
        label="상세 주소"
        name="detailAddress"
        value={orderInfo.detailAddress}
        onChange={handleChange}
        placeholder="상세 주소를 입력해주세요."
      />
      <Input
        label="휴대전화"
        name="phoneNumber"
        value={orderInfo.phoneNumber}
        onChange={handleChange}
        placeholder="휴대전화 번호를 입력해주세요."
      />
      <Input
        label="배송요청 사항"
        name="deliveryRequest"
        value={orderInfo.deliveryRequest}
        onChange={handleChange}
        placeholder="배송요청 사항을 입력해주세요."
      />
    </>
  );
}

export default AddressForm;
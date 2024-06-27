import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../../component/TopBar";
import "../../css/PurchaserInfo.css";
import PriceDetails from "../atoms/Purchaser_Reform_Price";
import AddressForm from "../molecules/Purchaser_Refom_AddressForm";
import Button from "../atoms/Purchaser_Reform_Button";
import { fetchPrice, handleReform, handleReformFinal } from "../services/Purchaser_Reform_Address";

function PurchaserInfo() {
  let navigate = useNavigate();
  const { estimateNumber } = useParams();
  const [productPrice, setProductPrice] = useState(null);
  const [reformPrice, setReformPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
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

  useEffect(() => {
    fetchPrice(estimateNumber, setProductPrice, setReformPrice, setTotalPrice);
  }, [estimateNumber]);

  return (
    <div>
      <TopBar />
      <h1 style={{ marginLeft: "15%", marginRight: "15%" }}>구매자 정보 입력</h1>
      <div className="purchaserInfo">
        <h4>배송지 정보 입력</h4>
        <PriceDetails
          productPrice={productPrice}
          reformPrice={reformPrice}
          totalPrice={totalPrice}
        />
        <AddressForm orderInfo={orderInfo} handleChange={handleChange} />
        <div>
          {status === false ? (
            <Button onClick={() => handleReform(estimateNumber, orderInfo, setStatus)}>배송정보 저장</Button>
          ) : (
            <Button onClick={() => handleReformFinal(estimateNumber, navigate)}>배송정보 최종승인</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaserInfo;
import React, { useState } from "react";
import PurchaserReformInfo_Template from "../component/template/PurchaserReformInfo_Template.js";
import "../css/PurchaserInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import store from "../store";
import { getAxios, patchAxios } from "../component/Axios";
import { useMutation, useQuery } from "react-query";

const PurchaserReformInfo = () => {
  let navigate = useNavigate();
  const { estimateNumber } = useParams();
  const [productPrice, setProductPrice] = useState(null);
  const [reformPrice, setReformPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [status, setStatus] = useState(false);
  const { reformInfo, setReformInfo } = store.useReformInfoStore();

  console.log(estimateNumber);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReformInfo({
      ...reformInfo,
      [name]: value,
    });
  };

  const handleReform = useMutation({
    mutationFn: (reformInfo) =>
      patchAxios(
        `/estimate/purchaser/acceptReformOrder/${estimateNumber}`,
        reformInfo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ),
    onSuccess: () => {
      alert("견적서 승인이 완료되었습니다.");
      setStatus(true);
    },
    onError: (error) => {
      alert("견적서 승인에 실패했습니다.");
    },
  });

  const handleRefromFinal = useMutation({
    mutationFn: () =>
      patchAxios(
        `/estimate/purchaser/acceptReformOrder/${estimateNumber}/complete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ),
    onSuccess: () => {
      alert("견적서가 최종 승인이 완료되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("견적서 최종 승인에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const fetchPrice = useQuery({
    queryKey: ["fetchPrice", estimateNumber],
    queryFn: () =>
      getAxios(`/estimate/purchaser/acceptReformOrder/${estimateNumber}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    onSuccess: (response) => {
      console.log(response);
      const data = response.data.data;
      setProductPrice(data.productPrice);
      setReformPrice(data.reformPrice);
      setTotalPrice(data.totalPrice);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <PurchaserReformInfo_Template
        reformInfo={reformInfo}
        handleChange={handleChange}
        handleReform={handleReform}
        handleReformFinal={handleRefromFinal}
        productPrice={productPrice}
        reformPrice={reformPrice}
        totlaPrice={totalPrice}
        status={status}
      />
    </div>
  );
};

export default PurchaserReformInfo;

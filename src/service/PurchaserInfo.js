import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../component/jwt";
import { useNavigate } from "react-router-dom";
import store from "../store";
import PurchaserInfo_Template from "../component/template/PurchaserInfo_Template.js";
import {
  putAxios,
} from "../component/Axios";

function PurchaserInfo() {
  let navigate = useNavigate();
  const { orderInfo, setOrderInfo } = store.useOrderInfoStore();

  const mutation = useMutation({
    mutationFn: (orderInfo) =>
      putAxios("/cart/purchaser/order", orderInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    onSuccess: () => {
      alert("구매가 완료되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.error("Order submission failed", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ [name]: value });
  };

  const handleOrder = () => {
    mutation.mutate(orderInfo);
  };

  return (
    <div>
      <PurchaserInfo_Template
        handleChange={handleChange}
        handleOrder={handleOrder}
        orderInfo={orderInfo}
        label={"주문하기"}
      />
    </div>
  );
}

export default PurchaserInfo;

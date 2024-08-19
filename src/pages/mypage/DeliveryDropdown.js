import React from 'react';
import Modal from 'react-modal';
import { TailWindButton } from "../../component/atoms/Button.js";
import { borderSkyBlue } from "../../styles/buttonStyle.js";
import { useState,useEffect } from "react";
import { patchAxios } from "../../component/Axios.js";


function DeliveryDropdown(props) {

    Modal.setAppElement("#root");

    const deliveryList = ["배송 대기", "배송 시작", "배송중", "배송 완료"];
    const [deliveryState, setDeliveryState] = useState([]);
    const [selectDelivery, setSelectDelivery] = useState([]);
  
    useEffect(() => {
      const newDeliveryState = [];
        if (props.soldProduct) {
          if (props.soldProduct[props.i].deliveryStatus === "WAITING") {
            newDeliveryState.push("배송 대기");
          } else if (props.soldProduct[props.i].deliveryStatus === "DELIVER_START") {
            newDeliveryState.push("배송 시작");
          } else if (props.soldProduct[props.i].deliveryStatus === "DELIVERING") {
            newDeliveryState.push("배송중");
          } else if (props.soldProduct[props.i].deliveryStatus === "DELIVER_COMPLETE") {
            newDeliveryState.push("배송 완료");
          }
      }
      setDeliveryState(newDeliveryState)
    }, [props.soldProduct]);
  
    const deliveryStatePatch = async (i, state) => {
      try {
        await patchAxios(`/order/seller-list/${props.soldProduct[props.i].orderId}/delivery-status?status=${state}`);
        console.log("베송상태 변경 완료");
      } catch (error) {
        console.log(error);
      }
    };
  
    const getTypeValue = (type) => {
      if (type === "배송 대기") {
        return "WAITING";
      } else if (type === "배송 시작") {
        return "DELIVER_START";
      } else if (type === "배송중") {
        return "DELIVERING";
      } else if (type === "배송 완료") {
        return "DELIVER_COMPLETE";
      }
    };
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const articleTypeHandler = (type) => {
      setSelectDelivery((prevState) => {
        const newArray = [...prevState];
        newArray[0] = type;
        return newArray;
      });
    };
  
    return (
      <>
        <button
          style={{ width: "120px" }}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full"
          onClick={openModal}
        >
          {deliveryState}
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1000 },
            content: {
              width: "50%",
              height: "20%",
              margin: "auto",
              border: "5px solid",
              borderRadius: "5px",
              padding: "20px",
              zIndex: 1001,
              borderColor: "#374d9a",
            },
          }}
        >
          <div onClick={closeModal} className="sellerMypageModal">
            {deliveryList.map((type, idx) => (
              <TailWindButton
              className = {`${borderSkyBlue} mr-3 mt-3`}
              style={{ marginRight: "3%" }}
              key={type}
              onClick={() => {
                setDeliveryState(type)
                articleTypeHandler(type);
                const value = getTypeValue(type);
                deliveryStatePatch(idx, value);
              }}            >
                {type}
              </TailWindButton>
            ))}
          </div>
        </Modal>
      </>
    );
  }
export default DeliveryDropdown;
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar.js";
import "../css/sellerMypage.css";
import Modal from "react-modal";
import { Button } from "antd";
import { TailWindButton } from "../component/atoms/Button.js";
import { borderSkyBlue } from "../styles/buttonStyle.js";
import { MypageProductList } from "../component/organism/sellerProductList.js";
import { patchAxios, getAxios } from "../component/Axios.js";

function MyPages() {
  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";
  const StockNavigate = useNavigate();
  const productupdateNavigate = useNavigate();
  const [registerData, setRegisterData] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [soldProduct, setSoldProduct] = useState();
  const productListStyle = {
    display: "flex",
    width: "800px",
    height: "160px",
    fontWeight: "700",
  }
  
  const productDeleteHandler = async (i) => {
    patchAxios( `/product/seller/register/${registerData[i].id}`)
    alert("상품 삭제 완료");
    window.location.replace(`/mypage`);
  }

  useEffect(() => {
    const fetchRegisterData = async () => {
      try {
        const registerResponse = await getAxios("/product/seller/register");
        const soldProductResponse = await getAxios(`/order/seller-list`)
        setRegisterData(registerResponse.data);
        setSoldProduct(soldProductResponse.data.data);
      } catch (error) {}
    };
    fetchRegisterData();
  }, []);

  useEffect(() => {
    const fetchSellerData = async (i) => {
      try {
        const sellerResponse = await getAxios("/seller/info");
        setSellerData(sellerResponse.data.data);
      } catch (error) {}
    };
    fetchSellerData();
  }, []);
  
  if (!sellerData) {
    return <div>데이터 로드중</div>;
  }

  return (
    <div>
      <TopBar />
      <div className="mypageContainer" style={{ marginLeft: "15%", marginRight: "15%" }}>
        <h3>마이페이지</h3>
        <div className="mypageProductList" style={{ display: "flex", marginBottom: "-28px" }}>
          <p style={{ display: "inline" }}>상품목록</p>
          <Button 
            style={{ marginLeft: "auto",marginBottom: "2%" }}
            onClick={() => {productupdateNavigate("/productupdate");}}
            type="primary"
            >
            상품등록
          </Button>
        </div>
        <div className = 'mypageProductListContainer'>
          {registerData.length >= 1 ? (
            <MypageProductList
              productList={registerData}
              Endpoint={Endpoint}
              navigate={StockNavigate}
              productDeleteHandler={productDeleteHandler}
              primaryLabel="가격"
              secondaryLabel="재고수"
              productName = {'productName'}
              imgUrl = 'imgUrl'
              primaryData="price"
              secondData="productStock"
              custom={ProductListCustom}
          />
          ) : (
            <h2
              style = {{
              display: "flex",
              height: "300px",
              marginTop: "2%",
              justifyContent: "center",
              alignItems: "center",
              color: "darkgrey",
              }}
            >
              상품을 등록해주세요
            </h2>
          )}
        </div>
        <p className = 'mt-5 -mb-3 flex'>
          판매 상품
        </p>
        {!soldProduct ? (
          <div className = 'soldProductListContainer'>
            <hr style={{ marginBottom: "10px" }}></hr>
            "판매된 상품이 존재하지 않습니다"
          </div>
        ) : (
          <div className = 'soldProductListContainer'>
            {<MypageProductList
              productList = {soldProduct}
              Endpoint={Endpoint}
              primaryLabel = {'고객 이메일'}
              secondaryLabel={'결제 금액'}
              primaryData={'purchaserEmail'}
              secondData={'totalPrice'}
              productName = {`orderDetails[0].productName`}
              imgUrl = {`orderDetails[0].imgUrl`}
            />}
          </div>
        )}
      </div>
    </div>
  );
}

Modal.setAppElement("#root");

export function DeliveryDropdown(props) {

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

function ProductListCustom(props){
  return(
    <div>
      <TailWindButton
        className = {`${borderSkyBlue} mr-3 mt-3`}
        onClick={() => {
          props.navigate(
            `/stockupdater/${props.productList[props.i].id}`
          );
        }}
      >
        상품 수정
      </TailWindButton>
      <TailWindButton
        className = {`${borderSkyBlue} mr-3 mt-3`}
        onClick={() => {
          props.productDeleteHandler(props.i);
        }}
      >
        상품 삭제
      </TailWindButton>
    </div>
  )
}





export default MyPages;

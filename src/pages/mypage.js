import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../pages/jwt.js";
import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";
import '../css/sellerMypage.css';
import Modal from 'react-modal';
import { Button, Dropdown, Flex } from 'antd';

const BtnStyle = styled.button`
  color: white;
  background: black;
`;

const StyledButton = styled.button`
    display: flex;
    width: 150px;
    background: white;
    transition: background 0.3s; // 부드러운 트랜지션을 위한 설정

    &:hover {
        background: black;
        color: white; // 마우스를 올렸을 때 글자 색상 변경도 가능하면 추가
    }
`;


function MyPages() {
  
  const customStyles = {
    overlay: {
      zIndex: 1000,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";
  const StockNavigate = useNavigate();
  const productupdateNavigate = useNavigate();
  const [registerData, setRegisterData] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [soldProduct, setSoldProduct] = useState();
  const deliveryList = ['배송 대기','배송 시작', '배송중', '배송 완료']
  const [deliveryState,setDeliveryState] = useState([]);
  const [selectDelivery,setSelectDelivery] = useState([]);
  const deliveryArray = [];

  const productDeleteHandler = async (i) => {
    try {
      const deleteProduct = await axiosInstance.delete(
        `/product/seller/register/${registerData[i].id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("상품 삭제 완료");
      window.location.replace(`/mypage2`);
    } catch (error) {
      console.log("상품삭제실패", error);
    }
  };

  useEffect(() => {
    const fetchRegisterData = async () => {
      try {
        const registerResponse = await axiosInstance.get(
          "/product/seller/register",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const soldProductResponse = await axiosInstance.get(
          `/order/seller-list`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setRegisterData(registerResponse.data);
        setSoldProduct(soldProductResponse.data.data);
        console.log(soldProductResponse.data.data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };
    fetchRegisterData();
  }, []);

  //판매자 정보 조회
  useEffect(() => {
    const fetchSellerData = async (i) => {
      try {
        const sellerResponse = await axiosInstance.get("/seller/info", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setSellerData(sellerResponse.data.data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };
    fetchSellerData();
  }, []);

  useEffect(() => {
    const newDeliveryState = [];
    if (soldProduct) {
      soldProduct.forEach((product, i) => {
        if (soldProduct[i].deliveryStatus === 'WAITING') {
          newDeliveryState.push('배송 대기');
        } else if (soldProduct[i].deliveryStatus === 'DELIVER_START') {
          newDeliveryState.push('배송 시작')
        } else if (soldProduct[i].deliveryStatus === 'DELIVERING') {
          newDeliveryState.push('배송중')
        } else if (soldProduct[i].deliveryStatus === 'DELIVER_COMPLETE') {
          newDeliveryState.push('배송 완료')
        }
      });
    }
    setDeliveryState(newDeliveryState)
  }, [soldProduct]);

  if(!sellerData){
    return <div>데이터 로드중</div>
  }
  
  return (
    <div className="mypageContainer">
      <TopBar />
      <h3>마이페이지</h3>
      <div
        className="mypageProductList"
        style={{ display: "flex", marginBottom: "-28px" }}
      >
        <p style={{ display: "inline" }}>상품목록</p>
        <Button style={{ marginLeft: "auto", marginBottom : '1%' }} 
        onClick={() => {productupdateNavigate("/productupdate");}} type="primary">상품등록
        </Button>
        
      </div>
      <div>
        {registerData.length >= 1 ? (
          <MypageProductList
            Endpoint={Endpoint}
            productDeleteHandler={productDeleteHandler}
            registerData={registerData}
            navigate={StockNavigate}
          />
        ) : (
          <h2
            style={{
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
      <p style={{ marginTop: "3%", marginBottom: "-12px", display: "flex" }}>
        판매 상품
      </p>
      {!soldProduct ? (<><hr style={{ marginBottom: "10px" }}></hr>
        "판매된 상품이 존재하지 않습니다"</>):
        <>
        {soldProduct.map(function(c,i){
          return(<React.Fragment key={i}><hr style={{ marginBottom: "10px" }}></hr>
            <div className = 'soldProductList' style = {{display : 'flex',fontWeight: "700", height : '160px', zIndex : '100',position: 'relative'}} >
              <div className = 'soldProductImage'>
                <img src = {Endpoint + soldProduct[i].orderDetails[0].imgUrl}width="130px" height="150px"></img>
              </div>
              <div className = 'soldProductInfoContainer' style = {{marginLeft : '10%'}}>
                <div className = 'soldProductTitle'><h3>상품명 : {soldProduct[i].orderDetails[0].productName}</h3></div>
                <div className = 'soldProductPurchaserEmail'>고객 이메일 : {soldProduct[0].purchaserEmail}</div>
                <div className = 'soldProductTotalPrice'>결제 금액 : {soldProduct[i].orderDetails[0].price}</div>
                <div className = 'soldProduct'>배송현황 : <DeliveryDropdown text={deliveryState[i]} articleTypeList = {deliveryList} setArticleType={setSelectDelivery} articleType={selectDelivery} i = {i} deliveryArray = {deliveryArray} soldProduct = {soldProduct}/></div>
              </div>
            </div>
            </React.Fragment>
          )
        })}
        </> 
      }
    </div>
  );
}

function MypageProductList(props) {
  return (
    <div>
      {props.registerData.map(function (image, i) {
        return (
          <React.Fragment key={i}>
            <hr style={{ marginBottom: "10px" }}></hr>
            <div className="stockItemContainer" style={{ display: "flex", width: '800px',height : '160px',fontWeight: "700" }}> 
              <div className="image">
                <img src={props.Endpoint + props.registerData[i].imgUrl} width="130px" height="150px"/>
              </div>
              <div className="productInfoContainer" style={{marginLeft: "10%", width : '400px'}}>
                <div className="title">
                  <h3>상품명 : {props.registerData[i].productName}</h3>
                </div>
                <div className = 'mypageProdictPirce'>
                  가격 : {props.registerData[i].price}
                </div>
                <div className="mypageStock" style={{ display: "flex",width : '100px' }}>
                  재고수 : {props.registerData[i].productStock}
                </div>
                <div className="BtnStyle" style={{ display: "flex", justifyContent: "flex-end" }}>
              
                  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full" style={{ marginRight: "5%" }} onClick={() => {props.navigate(`/stockupdater/${props.registerData[i].id}`);}}>상품 수정 </button>
                  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full" style={{ marginRight: "5%" }} onClick={() => {props.productDeleteHandler(i);}}>상품 삭제 </button>
                </div>
              </div>
            </div>
            </React.Fragment>
          
        );
      })}
      <hr></hr>
    </div>
  );
}

Modal.setAppElement('#root');

function DeliveryDropdown(props) {

  const deliveryStatePatch = async(i,state) => {
    try{await axiosInstance.patch(`/order/seller-list/${props.soldProduct[i].orderId}/delivery-status?status=${state}`) ;console.log('베송상태 변경 완료')}
    catch(error){console.log('배송상태 변경 실패')}
  }

  const getTypeValue = (type) => {
    if (type === '배송 대기') {
        return 'WAITING';
    } else if (type === '배송 시작') {
        return 'DELIVER_START';
    } else if (type === '배송중') {
        return 'DELIVERING';
    } else if (type === '배송 완료'){
        return 'DELIVER_COMPLETE';
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
    props.setArticleType(prevState => {
      const newArray = [...prevState];
      newArray[props.i] = type;
      return newArray;
    });
  };

  return (
    <>
      <button style = {{width : '120px'}}className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full" onClick={openModal}>
        {!props.articleType[props.i] ? props.text : props.articleType[props.i]}
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{
    overlay: {backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1000},
    content: {
      width: '50%', 
      height: '20%',
      margin: 'auto', 
      border: '5px solid', 
      borderRadius: '5px', 
      padding: '20px', 
      zIndex: 1001,
      borderColor: '#374d9a',
    }
  }}>
        <div onClick={closeModal} className = 'sellerMypageModal'>
          {props.articleTypeList.map((type, idx) => (
            <button className="bg-white hover:bg-gray-100 w-35 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full" style = {{marginRight : '3%'}}key={type} onClick={() => { articleTypeHandler(type); const value = getTypeValue(type); deliveryStatePatch(idx,value)}}>
              {type}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}


export default MyPages;

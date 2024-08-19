import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../component/TopBar.js";
import "../../css/sellerMypage.css";
import ProductListBtnBox from "./ProductListBtnBox.js";
import { Button } from "antd";
import { MypageProductList } from "./sellerProductList.js";
import { patchAxios, getAxios } from "../../component/Axios.js";

function MyPages() {
  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";
  const StockNavigate = useNavigate();
  const productupdateNavigate = useNavigate();
  const [registerData, setRegisterData] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [soldProduct, setSoldProduct] = useState();
  
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
              custom={ProductListBtnBox}
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


export default MyPages;

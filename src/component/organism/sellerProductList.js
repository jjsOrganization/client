import React from "react";
import { get } from 'lodash';
import { borderSkyBlue } from "../../styles/buttonStyle";
import { DeliveryDropdown } from "../../pages/mypage";


export const MypageProductList= ({
  productList, 
  Endpoint, 
  navigate, 
  productDeleteHandler, 
  productName,primaryLabel, 
  secondaryLabel, 
  primaryData, 
  secondData,
  imgUrl, 
  custom: CustomComponent, 
  ...props }) => {

    const productListStyle = {
      display: "flex",
      width: "800px",
      height: "160px",
      fontWeight: "700",
    }
  
    return (
    <div>
      {productList.map((product, i) => (
        <React.Fragment key={i}>
          <hr className='mb-2' />
          <div className="stockItemContainer" style={productListStyle}>
            <div className="image">
              <img
                src={Endpoint + get(product, imgUrl)}
                width="130px"
                height="150px"
              />
            </div>
            <div className="ml-16 w-400">
              <div className="title">
                <h3> 상품명 : {get(product, productName)}</h3>
              </div>
              <div className="mypageProdictPirce">
                {primaryLabel} : {product[primaryData]}
              </div>
              <div className="mypageStock" style={{ display: "flex", width: "auto" }}>
                {secondaryLabel} : {product[secondData]}
              </div>
              <div className="BtnStyle flex">
              {!CustomComponent?
                <div className="soldProduct">
                배송현황 : {" "}
                <DeliveryDropdown
                soldProduct = {productList}
                i = {i}
                />
                </div>
                :<CustomComponent
                i={i}
                productList={productList}
                borderSkyBlue={borderSkyBlue}
                navigate={navigate}
                productDeleteHandler={productDeleteHandler}
              />}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <hr />
    </div>
  );
  }
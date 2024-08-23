import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useQuery } from 'react-query';

import axiosInstance from "../../component/jwt.js";
import ProductDetails from "./ProductDetails.jsx";
import TopBar from "../../component/TopBar.js";
import ProductPhotoList from "./ProductPhotoList.jsx";

const fetchProductDetail = async (productid) => {
  const { data } = await axiosInstance.get(`/product/all/detail/${productid}`);
  return data;
};

export const useProductDetail = (productid) => {
  return useQuery(['get-product', productid], () => fetchProductDetail(productid));
};



function Detail(props) {
  let { productid } = useParams();

  const { data: productDetailInfo, isLoading, isError } = useProductDetail(productid);

  if (isLoading) {
    return <div>데이터를 로드하는 중입니다...</div>;
  }
  
  return (
    <div>
      <TopBar/>
        <ProductDetails productDetailInfo = {productDetailInfo} productid = {productid}/>
          <DetailWrapper>
            <ProductPhotoList productid = {productid}/>
          </DetailWrapper>
    </div>
  );
}

const DetailWrapper = styled.div`
  margin : 0 15% 0 15%
`

/*<Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            display : 'block',
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1000 },
            content: {
              width: "35%",
              height: "20%",
              margin: "auto",
              border: "3px solid",
              borderRadius: "5px",
              zIndex: 1001,
              borderColor: "#374d9a",
            },
          }}>
              <TailWindButton
                className = {`${borderSkyBlue} ml-20 mt-10`}
                onClick = {closeModal} >
                쇼핑 계속하기
              </TailWindButton>

              <TailWindButton
                className={`${borderSkyBlue} ml-10`}
                onClick = {() => {navigate('/PurchaserMyPage')}}>
                장바구니 이동
              </TailWindButton>
          </Modal>*/


export default Detail;

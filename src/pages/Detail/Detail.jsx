import React from "react";
import { useParams } from "react-router-dom";
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

/**/


export default Detail;

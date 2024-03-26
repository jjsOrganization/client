import '../css/PurchaserMypageOrderList.css';
import React, { useState } from 'react';
import exProductURL from "../images/exProduct.jpg"
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";

let BasicBtn = styled.button`
   background : black;
   color : white;
   width : 100px;
   height : 25px;
   line-height: 3px;
   border-radius: 10px;
`

function CustomerOrderList() {

   let navigate = useNavigate();

   const [customerOrderedProducts, setCustomerOrderedProducts] = useState([
      { 
         id: 1, 
         name: '테스트 상품 1', 
         image: [exProductURL],
         options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
         price: 15000,
         description: '상품 설명',
         date: '2023-11-23(20231123-00024)',
         state:'배송완료' 
      },
      { 
         id: 2, 
         name: '테스트 상품 2', 
         image: [exProductURL],
         options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
         price: 15000,
         description: '상품 설명',
         date: '2023-11-25(20231125-00002)',
         state:'배송출발'
      },
      { 
         id: 3, 
         name: '테스트 상품 3', 
         image: [exProductURL],
         options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
         price: 15000,
         description: '상품 설명',
         date: '2023-11-27(20231127-00001)',
         state:'상품접수'
      },
      // 나머지 상품 정보들...
   ]);

   const [customerReformProducts, setOrderedProducts] = useState([
      { 
         id: 1, 
         name: '리폼 테스트 상품 1', 
         image: [exProductURL],
         options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
         price: 15000,
         description: '상품 설명',
         date: '2023-11-23(20231123-00024)',
         state:'리폼진행중'
      },
      { 
         id: 2, 
         name: '리폼 테스트 상품 2', 
         image: [exProductURL],
         options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
         price: 15000,
         description: '상품 설명',
         date: '2023-11-25(20231125-00002)',
         state:'리폼완료'
      },
      // 나머지 상품 정보들...
   ]);

   return (
      <div className='customerOrderReformProduct'>
         <TopBar />
         <h1>마이페이지</h1>
         <div className='customerOrederedProduct'>
            <h4>주문내역</h4>
            <hr className='customerOrderFirstHr'></hr>
            {customerOrderedProducts.map((product) => (
               <div key={product.id}>
                  <h5>{product.date}</h5>
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                  <p>{product.price}원</p>
                  <p>{product.options}</p>
                  {/* 배송현황 페이지로 이동하는 버튼 없길래 새로 만들고 연결 시켜둠 */}
                  <p>배송현황 : {product.state} <BasicBtn onClick = {()=> {navigate("/mypage/delivery")}} >자세히</BasicBtn></p>
                  <hr className='customerOrderLastHr'></hr>
               </div>
            ))}
         </div>

         <div className='customerReformProduct'>
            <h4>리폼내역</h4>
            <hr className='customerReformFirstHr'></hr>
            {customerReformProducts.map((reProduct) => (
               <div key={reProduct.id}>
                  <h5>{reProduct.date}</h5>
                  <img src={reProduct.image} alt={reProduct.name} />
                  <p>{reProduct.name}</p>
                  <p>{reProduct.price}원</p>
                  <p>{reProduct.options}</p>
                  <p>{reProduct.state}</p>
                  <hr className='customerReformLastHr'></hr>
               </div>
            ))}
         </div>
      </div>
   );
}

export default CustomerOrderList;
import '../css/CustomerMyPageDelivery.css';
import React, { useState, useEffect } from 'react';
import exProductURL from "../images/exProduct.jpg"

import 상품접수일반 from "../images/상품접수일반.png"
import 상품접수선택 from "../images/상품접수선택.png"

import 터미널입고일반 from "../images/터미널입고일반.png"
import 터미널입고선택 from "../images/터미널입고선택.png"

import 배송터미널도착일반 from "../images/배송터미널도착일반.png"
import 배송터미널도착선택 from "../images/배송터미널도착선택.png"

import 배송출발일반 from "../images/배송출발일반.png"
import 배송출발선택 from "../images/배송출발선택.png"

import 배송완료일반 from "../images/배송완료일반.png"
import 배송완료선택 from "../images/배송완료선택.png"

import next from "../images/next.png"

import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";

function CustomerDelivery() {
   const [customerDeliveryData, setCustomerDeliveryData] = useState([
      { date: '2023-11-25', time: '18:05', location: '대전성남(집)', state: '고객님의 상품을 접수하였습니다.' },
      { date: '2023-11-25', time: '19:03', location: '부천터미널', state: '고객님의 상품을 집하하여 부천터미널에 입고되었습니다.' }
  ]); // DB에서 가져온 데이터 예시 더미 데이터
   let [customerSelectedProduct, setCustomerSelectedProduct] = useState({ 
      id: 1, 
      name: '테스트 상품', 
      image: [exProductURL],
      options : '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
      price : 15000,
      description: '상품 설명',
      date: '2023-11-23(20231123-00024)',
      state: '배송출발'
   }); // DB에서 가져온 데이터 예시 더미 데이터

   // const handleDeliveryStateChange = (newState) => {
   //    setCustomerSelectedDeliveryState(newState);
   //    customerDeliveryState = selectedCustomerDeliveryState;
   // };

    // DB에서 데이터를 가져오는 함수
   //  useEffect(() => {
   //      // 예시: fetch를 사용하여 서버에서 데이터를 가져옴
   //      fetch('URL')
   //          .then(response => response.json())
   //          .then(data => setCustomerDeliveryData(data))
   //          .catch(error => console.error('Error fetching data:', error));
   //  }, []);

   return (
      <div className='customerD'>
         <TopBar />

         {/* <select value={selectedCustomerDeliveryState} onChange={(e) => handleDeliveryStateChange(e.target.value)}>
         {customerDeliveryState.map((state, index) => (
            <option key={index} value={state}>{state}</option>
         ))}
         </select> */}

         <h1>마이페이지</h1>

         {/* 선택된 상품 정보 */}
         <div className='customerSelectedProduct'>
            <h4>배송중인 상품</h4>
            <hr className='customerDeliveryFirstHr'></hr>
            {/* <h2>선택된 상품: {selectedProduct.name}</h2> */}
            <h5>{customerSelectedProduct.date}</h5>
            <img src={customerSelectedProduct.image} alt={customerSelectedProduct.name} />
            <p>{customerSelectedProduct.name}</p>
            <p>{customerSelectedProduct.price}원</p>
            <p>{customerSelectedProduct.options}</p>
            <p>현재 배송 상태: {customerSelectedProduct.state}</p>
            <hr className='customerDeliveryLastHr'></hr>
         </div>

         <div className='customerDeliveryStateImg'>
            {customerSelectedProduct.state === '상품접수' ? (
               <div className="receiptImages">
                     <img src={상품접수선택} />
                     <h2>상품접수</h2>
               </div>
            ) : (
               <div className="receiptImages">
                     <img src={상품접수일반} />
                     <h2>상품접수</h2>
               </div>
            )}
            <img src={next} />

            {customerSelectedProduct.state === '터미널입고' ? (
               <div className="terminalImages">
                     <img src={터미널입고선택} />
                     <h2>터미널입고</h2>
               </div>
            ) : (
               <div className="terminalImages">
                     <img src={터미널입고일반} />
                     <h2>터미널입고</h2>
               </div>
            )}
            <img src={next} />

            {customerSelectedProduct.state === '배송터미널도착' ? (
               <div className="arrivalImages">
                     <img src={배송터미널도착선택} />
                     <h2>배송터미널도착</h2>
               </div>
            ) : (
               <div className="arrivalImages">
                     <img src={배송터미널도착일반} />
                     <h2>배송터미널도착</h2>
               </div>
            )}
            <img src={next} />

            {customerSelectedProduct.state === '배송출발' ? (
               <div className="departureImages">
                     <img src={배송출발선택} />
                     <h2>배송출발</h2>
               </div>
            ) : (
               <div className="departureImages">
                     <img src={배송출발일반} />
                     <h2>배송출발</h2>
               </div>
            )}
            <img src={next} />

            {customerSelectedProduct.state === '배송완료' ? (
               <div className="finishImages">
                     <img src={배송완료선택} />
                     <h2>배송완료</h2>
               </div>
            ) : (
               <div className="finishImages">
                     <img src={배송완료일반} />
                     <h2>배송완료</h2>
               </div>
            )}
         </div>
         <hr></hr>
         <table className='customerStateTable'>
            <thead>
               <tr>
                  <th>날짜</th>
                  <th>시간</th>
                  <th>현재 위치</th>
                  <th>현재 상태</th>
               </tr>
            </thead>
            <tbody>
               {customerDeliveryData.map((item, index) => (
               <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.location}</td>
                  <td>{item.state}</td>
               </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default CustomerDelivery;
import '../css/PurchaserMyPageDelivery.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import exProductURL from "../images/exProduct.jpg"
import axiosInstance from "../component/jwt.js";

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

   let {index} = useParams();
   const [deliveryState,setDeliveryState] = useState();
   const [orderProduct, setOrderProduct] = useState();
   const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";

   useEffect(() => {
      const fetchData = async() => {
         try{
            const responseOrderList = await axiosInstance.get(`/order/purchaser-list`, {
               headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }})
            setOrderProduct(responseOrderList.data.data);
         } catch(error){
         console.log('주문상품 조회 실패')
      }
      }; fetchData()
   },[])

   useEffect(() => {
      if (!orderProduct) return;
      if (orderProduct[index].deliveryStatus === 'WAITING') {
         setDeliveryState('배송 대기');
      } else if (orderProduct[index].deliveryStatus === 'DELIVER_START') {
         setDeliveryState('배송 시작')
      } else if (orderProduct[index].deliveryStatus === 'DELIVERING') {
         setDeliveryState('배송중')
      } else if (orderProduct[index].deliveryStatus === 'DELIVER_COMPLETE') {
         setDeliveryState('배송 완료')
      }
   },[orderProduct])
   
   
   //이 아래는 준규형 코드

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

   if (!deliveryState) {
      return <div>Loading...</div>; // 데이터를 가져오는 중에는 로딩 메시지를 표시
}
   
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
            <h5>{orderProduct[index].orderDate}</h5>
            <img src={Endpoint + orderProduct[index].imgUrl} alt={customerSelectedProduct.name} />
            <p>{orderProduct[index].productName}</p>
            <p>{orderProduct[index].price}원</p>
            <p>{customerSelectedProduct.options}</p>
            <p>현재 배송 상태: {deliveryState}</p>
            <hr className='customerDeliveryLastHr'></hr>
         </div>

         <div className='customerDeliveryStateImg'>
            {deliveryState === '배송 대기' ? (
               <div className="receiptImages">
                     <img src={상품접수선택} />
                     <h2>배송 대기</h2>
               </div>
            ) : (
               <div className="receiptImages">
                     <img src={상품접수일반} />
                     <h2>배송 대기</h2>
               </div>
            )}
            <img src={next} />

            {deliveryState === '배송 시작' ? (
               <div className="terminalImages">
                     <img src={터미널입고선택} />
                     <h2>배송 시작</h2>
               </div>
            ) : (
               <div className="terminalImages">
                     <img src={터미널입고일반} />
                     <h2>배송 시작</h2>
               </div>
            )}
            <img src={next} />

            {deliveryState === '배송중' ? (
               <div className="arrivalImages">
                     <img src={배송터미널도착선택} />
                     <h2>배송중</h2>
               </div>
            ) : (
               <div className="arrivalImages">
                     <img src={배송터미널도착일반} />
                     <h2>배송중</h2>
               </div>
            )}
            <img src={next} />

            {deliveryState === '배송 완료' ? (
               <div className="departureImages">
                     <img src={배송출발선택} />
                     <h2>배송 완료</h2>
               </div>
            ) : (
               <div className="departureImages">
                     <img src={배송출발일반} />
                     <h2>배송 완료</h2>
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
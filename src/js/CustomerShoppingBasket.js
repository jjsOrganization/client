import React, { useState, useEffect } from 'react';
import '../css/CustomerShoppingBasket.css';
import exProductURL from "../images/exProduct.jpg";

function CustomerShoppingBasket() {
   const [customerShoppingBasket, setCustomerShoppingBasket] = useState([
      { 
         id: 1, 
         name: '테스트 상품 1', 
         image: [exProductURL],
         options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
         price: 15000,
         count: 2,
         deliveryPrice: 3000,
         totalPrice : 0,
         checked: true // 체크 여부
      },
      { 
         id: 2, 
         name: '테스트 상품 2', 
         image: [exProductURL],
         options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
         price: 15000,
         count: 3,
         deliveryPrice: 3000,
         totalPrice : 0,
         checked: true
      },
      // 나머지 상품 정보들...
   ]);

   useEffect(() => {
      // 페이지가 처음 로드될 때 모든 상품의 totalPrice를 계산하여 설정
      const updatedBasket = customerShoppingBasket.map(product => ({
         ...product,
         totalPrice: (product.price * product.count) + product.deliveryPrice
      }));
      setCustomerShoppingBasket(updatedBasket);
   }, []);

   const setProductCount = (productId, newCount) => {
      setCustomerShoppingBasket(prevBasket =>
         prevBasket.map(product => {
            if (product.id === productId) {
               const count = Math.max(newCount, 0);
               const totalPrice = count === 0 ? 0 : (product.price * count) + product.deliveryPrice;
               return { ...product, count, totalPrice };
            }
            return product;
         })
      );
   };

   const handleCheckboxChange = (productId) => {
      setCustomerShoppingBasket(prevBasket =>
         prevBasket.map(product => {
            if (product.id === productId) {
               return { ...product, checked: !product.checked };
            }
            return product;
         })
      );
   };

   const totalPriceOfCheckedItems = customerShoppingBasket
      .filter(product => product.checked)
      .reduce((total, product) => total + product.totalPrice, 0);

   return (
      <div>
         <h1>장바구니</h1>
         <div className='customerBakset'>
            <h4>주문하기</h4>
            {customerShoppingBasket.map((product) => (
               <div key={product.id}>
                  <hr className='customerBasketFirstHr'></hr>
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                  <p>{product.price}원</p>
                  <p>{product.options}</p>
                  <p>갯수 : 
                     <button className='basketCountButton' onClick={() => setProductCount(product.id, product.count - 1)} disabled={product.count <= 0}>-</button>
                     {product.count}
                     <button className='basketCountButton' onClick={() => setProductCount(product.id, product.count + 1)}>+</button>
                  </p>
                  <p>배송비 : {product.deliveryPrice}</p>
                  <p>주문금액 : {product.totalPrice}</p>
                  <input className='checkBoxForBasket'
                     type="checkbox"
                     checked={product.checked}
                     onChange={() => handleCheckboxChange(product.id)}
                  />
                  <hr className='customerBasketLastHr'></hr>
               </div>
            ))}
            <div>
               <h3>선택한 상품 총액: {totalPriceOfCheckedItems}</h3>
               <button className='baksetOrderButton'>주문하기</button>
            </div>
         </div>
      </div>
   );
}

export default CustomerShoppingBasket;
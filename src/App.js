import React, { useState } from 'react';
import './App.css';

import './js/Visual.js';
import './js/Login.js';
import './js/ProductList.js';
import './js/CustomerMyPageDelivery.js';
import './js/CustomerMypageOrderList.js';

import Login from './js/Login.js';
import Visual from './js/Visual.js';
import { ProductList, ProductDetail} from './js/ProductList.js';
import CustomerMypageDelivery from './js/CustomerMyPageDelivery.js';
import CustomerMypageOrderList from './js/CustomerMypageOrderList.js';
import CustomerShoppingBasket from './js/CustomerShoppingBasket.js';



import { Routes, Route } from 'react-router-dom'
import exProductURL from "./images/exProduct.jpg"

const App = () => {

  const [selectedTab, setSelectedTab] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const itemsPerPage = 6; // 페이지당 보여줄 상품 수
  const products = [
    {
      id: 1,
      name: '상품 1',
      images: [exProductURL],
    },
    {
      id: 2,
      name: '상품 2',
      images: [exProductURL],
    },
    {
      id: 3,
      name: '상품 3',
      images: [exProductURL],
    },
    {
      id: 4,
      name: '상품 4',
      images: [exProductURL],
    },
    {
      id: 5,
      name: '상품 5',
      images: [exProductURL],
    },
    {
      id: 6,
      name: '상품 6',
      images: [exProductURL],
    },
    {
      id: 7,
      name: '상품 7',
      images: [exProductURL],
    },
    {
      id: 8,
      name: '상품 8',
      images: [exProductURL],
    },
    {
      id: 9,
      name: '상품 9',
      images: [exProductURL],
    },
  ];

  return (
    <div>
      <Routes>

      <Route
        path="login"
        element={<Login selectedTab={selectedTab} setSelectedTab={setSelectedTab} userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} />}
      />

      <Route 
        path="visual"
        element={<Visual/>}
      />

      <Route
        path="products/:page?"
        element={<ProductList products={products} itemsPerPage={itemsPerPage} />}
      />

      <Route
        path="product/:productId"
        element={<ProductDetail products={products} />}
      />

      <Route
        path="mypage/delivery"
        element={<CustomerMypageDelivery/>}
      />

      <Route
        path="mypage/orderlist"
        element={<CustomerMypageOrderList/>}
      />

<Route
        path="shoppingbasket"
        element={<CustomerShoppingBasket/>}
      />

      </Routes>
      
    </div>
  );
};

export default App;
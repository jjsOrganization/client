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

import { Routes, Route, useNavigate } from 'react-router-dom'
import exProductURL from "./images/exProduct.jpg"


import { Button, Nav } from 'react-bootstrap';
import DesignerSearch from './pages/DesignerSearch';
import DesignerProduct from './pages/DesignerProduct';
import DesignerPortfolio from './pages/DesignerPortfolio';
import DesignerRanking from './pages/DesignerRanking';



const App = () => {

  let navigate = useNavigate();

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

      <div className="App">
        {/* <div>
          <div className = 'loginMenu' style = {{marginBottom : '40px', color : 'black'}}>
          <div className = 'nav'><Nav.Link onClick = {() => {navigate('/')}}>로그아웃</Nav.Link></div>
          <div className = 'nav'><Nav.Link onClick = {() => {navigate('/')}}>장바구니</Nav.Link></div>
          <div className = 'nav'><Nav.Link onClick = {() => {navigate('/')}}>마이페이지</Nav.Link></div>
          </div>

          <div className = 'MenuBar' >
            <div className = 'logo'><Nav.Link onClick = {() => {navigate('/')}}></Nav.Link></div>
            <div className = 'menu'><Nav.Link onClick = {() => {navigate('/')}}>바늘</Nav.Link></div>
            <div className = 'menu'><Nav.Link onClick = {() => {navigate('/')}}>상품검색</Nav.Link></div>
            <div className = 'menu'><Nav.Link onClick = {() => {navigate('/DesignerSearch')}}>디자이너 검색</Nav.Link></div>
            <div className = 'menu'><Nav.Link onClick = {() => {navigate('/')}}>물 시각화</Nav.Link></div>
            <div className = 'menu'> <Nav.Link onClick = {() => {navigate('/DesignerRanking')}}>디자이너 순위</Nav.Link> </div>
          </div>
        </div> */}

        <Routes>
          <Route path="/DesignerSearch" element={<DesignerSearch/>}/>
          <Route path="/DesignerProduct" element={<DesignerProduct/>}/>
          <Route path="/DesignerPortfolio" element={<DesignerPortfolio/>}/>
          <Route path="/DesignerRanking" element={<DesignerRanking/>}/>
        </Routes>
    </div>
      
    </div>
  );
};

export default App;
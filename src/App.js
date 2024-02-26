import React, { useState, useEffect } from "react";
import "./App.css";

import "./js/Visual.js";
import "./js/Login.js";
import "./js/ProductList.js";
import "./js/CustomerMyPageDelivery.js";
import "./js/CustomerMypageOrderList.js";
import "./js/TopBar.js";

import TopBar from "./js/TopBar.js";
import Login from "./js/Login.js";
import Visual from "./js/Visual.js";
import { ProductList, ProductDetail } from "./js/ProductList.js";
import CustomerMypageDelivery from "./js/CustomerMyPageDelivery.js";
import CustomerMypageOrderList from "./js/CustomerMypageOrderList.js";
import CustomerShoppingBasket from "./js/CustomerShoppingBasket.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import exProductURL from "./images/exProduct.jpg";
import axios from 'axios';

import { Button, Nav } from "react-bootstrap";
import DesignerSearch from "./pages/DesignerSearch";
import DesignerProduct from "./pages/DesignerProduct";
import DesignerPortfolio from "./pages/DesignerPortfolio";
import DesignerRanking from "./pages/DesignerRanking";

import data from "./data.js";
import Detail from "./pages/Detail.js";
import ProductUpdate from "./pages/productRegistration.js";
import StockList from "./pages/stockList.js";
import StockUpdater from "./pages/stockUpdater.js";
import MyPages from "./pages/mypages.js";
import Main from "./pages/main.js";
import Reform from './pages/reform.js'

const App = () => {
  

  let [onOff, setOnOff] = useState(false);
  let navigate = useNavigate();

  //서버에서 받은 데이터 이용해 메인 상품 추가
  let [serverMainImage, setServerMainImage] = useState();

  let [mainImage, setMainImage] = useState([
    "https://i.postimg.cc/zfrVFgNL/1.png",
    "https://i.postimg.cc/zv6fbLpG/2.png",
    "https://i.postimg.cc/6QfTjp6M/3.png",
  ]);

  const [selectedTab, setSelectedTab] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const itemsPerPage = 6; // 페이지당 보여줄 상품 수
  const [productData,setProductData] = useState();
  const products = [
    {
      id: 1,
      name: "상품 1",
      images: [exProductURL],
    },
    {
      id: 2,
      name: "상품 2",
      images: [exProductURL],
    },
    {
      id: 3,
      name: "상품 3",
      images: [exProductURL],
    },
    {
      id: 4,
      name: "상품 4",
      images: [exProductURL],
    },
    {
      id: 5,
      name: "상품 5",
      images: [exProductURL],
    },
    {
      id: 6,
      name: "상품 6",
      images: [exProductURL],
    },
    {
      id: 7,
      name: "상품 7",
      images: [exProductURL],
    },
    {
      id: 8,
      name: "상품 8",
      images: [exProductURL],
    },
    {
      id: 9,
      name: "상품 9",
      images: [exProductURL],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/all`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'X-CSRF-TOKEN': localStorage.getItem('csrfToken'),
          }
        });
        setProductData(response.data); // 수정된 부분
      } catch(error) {
        console.log('데이터 로드 실패', error);
      }
    }
    fetchData();
  }, [])
  

  return (
    <div>
      <Routes>
        <Route
          path="login"
          element={
            <Login
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />

        <Route path="visual" element={<Visual />} />

        <Route
          path="products/:page?"
          element={
            <ProductList products={products} itemsPerPage={itemsPerPage} />
          }
        />

        <Route
          path="product/:productId"
          element={<ProductDetail products={products} />}
        />

        <Route path="mypage/delivery" element={<CustomerMypageDelivery />} />

        <Route path="mypage/orderlist" element={<CustomerMypageOrderList />} />

        <Route path="shoppingbasket" element={<CustomerShoppingBasket />} />
      </Routes>

      <div className="App">
        <Routes>
          <Route path="/DesignerSearch" element={<DesignerSearch />} />
          <Route path="/DesignerProduct" element={<DesignerProduct />} />
          <Route path="/DesignerPortfolio" element={<DesignerPortfolio />} />
          <Route path="/DesignerRanking" element={<DesignerRanking />} />
        </Routes>

        <Routes>
          <Route
            path="/"
            element={
              <div className="main-bg">
                <Main />
              </div>
            }
          ></Route>

          <Route path="/detail/:productid" element={<Detail />} /><Route />

          <Route path="/productupdate" element={<ProductUpdate />}></Route>

          <Route
            path="/stockList"
            element={<StockList data={data} mainImage={mainImage} />}></Route>

          <Route path="/stockupdater/:id" element={<StockUpdater />} /><Route />

          <Route path="/mypage2" element={<MyPages data={data} />}></Route>

          <Route path = '/reform/1' element ={ <Reform/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;

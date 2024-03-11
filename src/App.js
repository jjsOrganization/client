import React, { useState, useEffect } from "react";
import "./App.css";

import "./js/Visual.js";
import "./js/Login.js";
import "./js/ProductList.js";
import "./js/CustomerMyPageDelivery.js";
import "./js/CustomerMypageOrderList.js";
import "./js/TopBar.js";
import "./js/DesignerSelect.js";

import DesignerSelect from "./js/DesignerSelect.js";
import TopBar from "./js/TopBar.js";
import Login from "./js/Login.js";
import Visual from "./js/Visual.js";
import Reform from "./js/Reform.js";
import { ProductList, ProductDetail } from "./js/ProductList.js";
import CustomerMypageDelivery from "./js/CustomerMyPageDelivery.js";
import CustomerMypageOrderList from "./js/CustomerMypageOrderList.js";
import CustomerShoppingBasket from "./js/CustomerShoppingBasket.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import exProductURL from "./images/exProduct.jpg";

import { Button, Nav } from "react-bootstrap";
import DesignerSearch from "./pages/DesignerSearch";
import DesignerProduct from "./pages/DesignerProduct";
import DesignerPortfolio from "./pages/DesignerPortfolio";
import DesignerRanking from "./pages/DesignerRanking";
import DesignerMypage from "./pages/DesignerMypage.js";
import ModifyPortfolio from "./pages/ModifyPortfolio.js";
import RegisterPortfolio from "./pages/RegisterPortfolio.js";
import DesignerReformState from "./pages/DesignerReformState.js";
import Signup from "./pages/Signup.js";

import data from "./data.js";
import Detail from "./pages/Detail.js";
import ProductUpdate from "./pages/productRegistration.js";
import StockList from "./pages/stockList.js";
import StockUpdater from "./pages/stockUpdater.js";
import MyPages from "./pages/mypage.js";
import Main from "./pages/main.js";

const App = () => {
  let navigate = useNavigate();

  let [mainImage, setMainImage] = useState([
    "https://i.postimg.cc/zfrVFgNL/1.png",
    "https://i.postimg.cc/zv6fbLpG/2.png",
    "https://i.postimg.cc/6QfTjp6M/3.png",
  ]);

  const [selectedTab, setSelectedTab] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <Route path="products/:page?" element={<ProductList />} />

        <Route path="product/:productId" element={<ProductDetail />} />

        <Route path="mypage/delivery" element={<CustomerMypageDelivery />} />

        <Route path="mypage/orderlist" element={<CustomerMypageOrderList />} />

        <Route path="shoppingbasket" element={<CustomerShoppingBasket />} />
      </Routes>

      <div className="App">
        <Routes>
          <Route path="Signup" element={<Signup />} />
          <Route path="/DesignerSearch" element={<DesignerSearch />} />
          <Route path="/DesignerProduct" element={<DesignerProduct />} />
          <Route path="/DesignerPortfolio" element={<DesignerPortfolio />} />
          <Route path="/DesignerRanking" element={<DesignerRanking />} />
          <Route path="/DesignerMypage" element={<DesignerMypage />} />
          <Route path="/DesignerMypage/ModifyPortfolio" element={<ModifyPortfolio />} />
          <Route path="/DesignerMypage/ModifyPortfolio/RegisterPortfolio" element={<RegisterPortfolio />} />
          <Route path="/DesignerMypage/ReformState" element={<DesignerReformState />} />
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

          <Route path="/detail/:productid" element={<Detail />} />
          <Route />

          <Route path="/productupdate" element={<ProductUpdate />}></Route>

          <Route
            path="/stockList"
            element={<StockList data={data} mainImage={mainImage} />}
          ></Route>

          <Route path="/stockupdater/:productid" element={<StockUpdater />} />
          <Route />

          <Route path="/mypage2" element={<MyPages data={data} />}></Route>

          <Route path="/reform" element={<Reform />}></Route>

          <Route path="/designerSelect" element={<DesignerSelect />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;

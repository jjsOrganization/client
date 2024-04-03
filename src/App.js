import React, { useState } from "react";
import "./App.css";
import LiveChat from "./component/LiveChat.js";
import PortpolioList from "./pages/PortpolioList.js";
import PurchaserAddressEdit from "./component/PurchaserAddressEdit.js";
import PurchaserPasswordEdit from "./component/PurchaserPasswordEdit.js";
import PurchaserPNumberEdit from "./component/PurchaserPNumberEdit.js";
import PurchaserInfoEdit from "./pages/PurchaserInfoEdit.js";
import PurchaserMyPage from "./pages/PurchaserMyPage.js";
import PurchaserInfo from "./pages/PurchaserInfo.js";
import Login from "./pages/Login.js";
import Visual from "./pages/Visual.js";
import Reform from "./pages/Reform.js";
import ProductList from "./pages/ProductList.js";
import PurchaserMypageDelivery from "./pages/PurchaserMyPageDelivery.js";
import PurchaserShoppingBasket from "./pages/PurchaserShoppingBasket.js";
import { Routes, Route } from "react-router-dom";
import DesignerSearch from "./pages/DesignerSearch";
import DesignerProduct from "./pages/DesignerProduct";
import DesignerPortfolio from "./pages/DesignerPortfolio";
import DesignerRanking from "./pages/DesignerRanking";
import DesignerMypage from "./pages/DesignerMypage.js";
import ModifyPortfolio from "./pages/ModifyPortfolio.js";
import RegisterPortfolio from "./pages/RegisterPortfolio.js";
import DesignerReformState from "./pages/DesignerReformState.js";
import Signup from "./pages/Signup.js";
import Detail from "./pages/Detail.js";
import ProductUpdate from "./pages/productRegistration.js";
import StockList from "./pages/stockList.js";
import StockUpdater from "./pages/stockUpdater.js";
import MyPages from "./pages/mypage.js";
import Main from "./pages/main.js";
import Example from './pages/test'


const App = () => {

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


        <Route path="mypage/delivery" element={<PurchaserMypageDelivery />} />

        <Route path="shoppingbasket" element={<PurchaserShoppingBasket />} />
      </Routes>

      <div className="App">
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Designers/:page?" element={<DesignerSearch />} /> 
          <Route path="/DesignerProduct" element={<DesignerProduct />} />
          <Route path="/DesignerPortfolio" element={<DesignerPortfolio />} />
          <Route path="/DesignerRanking" element={<DesignerRanking />} />
          <Route path="/DesignerMypage" element={<DesignerMypage />} />
          <Route path="/DesignerMypage/ModifyPortfolio/:portfolidId" element={<ModifyPortfolio />} />
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

          <Route path="/stockupdater/:productid" element={<StockUpdater />} />
          <Route />

          <Route path="/mypage2" element={<MyPages/>}></Route>

          <Route path="/reform" element={<Reform />}></Route>

          <Route path="/PurchaserInfo" element={<PurchaserInfo />}></Route>

          <Route path="/PurchaserMyPage" element={<PurchaserMyPage />}></Route>

          <Route path="/Mypage/PurchaserInfoEdit" element={<PurchaserInfoEdit />}></Route>

          <Route path="/Mypage/PurchaserInfoEdit/PurchaserPNumberEdit" element={<PurchaserPNumberEdit />}></Route>

          <Route path="/Mypage/PurchaserInfoEdit/PurchaserPasswordEdit" element={<PurchaserPasswordEdit />}></Route>
          
          <Route path="/Mypage/PurchaserInfoEdit/PurchaserAddressEdit" element={<PurchaserAddressEdit />}></Route>

          <Route path="/PortpolioList" element={<PortpolioList />}></Route>

          <Route path = "/testpages" element = {<Example/>}></Route>
          
          <Route path = "/LiveChat" element = {<LiveChat/>}></Route>
          
        </Routes>
      </div>
    </div>
  );
};

export default App;
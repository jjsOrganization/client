import React, { useState } from "react";
import "./App.css";
import PortfolioList from "./pages/PortfolioList.js";
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
import { Routes, Route } from "react-router-dom";
import DesignerSearch from "./pages/DesignerSearch";
import DesignerMypage from "./pages/DesignerMypage.js";
import ModifyPortfolio from "./pages/ModifyPortfolio.js";
import RegisterPortfolio from "./pages/RegisterPortfolio.js";
import Signup from "./pages/Signup.js";
import Detail from "./pages/Detail.js";
import ProductUpdate from "./pages/productRegistration.js";
import StockUpdater from "./pages/stockUpdater.js";
import MyPages from "./pages/mypage.js";
import Main from "./pages/main.js";
import DesignerWriteEstimate from "./component/DesignerWriteEstimate.js";
import PurchaserReformInfo from "./pages/PurchaserReformInfo.js";
import ConfigurationManagement from "./pages/designerConfigurationManagement.js";
import ReformCompleted from "./pages/reformComplete.js";
import DesignerSelect from "./pages/DesignerSelect.js";
import Test from "./service/PurchaserReformInfo.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [estimateNumber, setEstimateNumber] = useState(null);
  const [isReform, setIsReform] = useState(false);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="visual" element={<Visual />} />
          <Route path="products/:page?" element={<ProductList />} />
          <Route path="/mypage/delivery/:index" element={<PurchaserMypageDelivery />} />
        </Routes>

        <div className="App">
          <Routes>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Designers/:page?" element={<DesignerSearch />} />
            <Route path="/DesignerMypage" element={<DesignerMypage />} />
            <Route path="/DesignerMypage/ModifyPortfolio/:portfolidId" element={<ModifyPortfolio />} />
            <Route path="/DesignerMypage/ModifyPortfolio/RegisterPortfolio" element={<RegisterPortfolio />} />
          </Routes>

          <Routes>
            <Route path="/" element={<div className="main-bg"><Main /></div>} />
            <Route path="/detail/:productid" element={<Detail />} />
            <Route path="/productupdate" element={<ProductUpdate />} />
            <Route path="/stockupdater/:productid" element={<StockUpdater />} />
            <Route path="/mypage" element={<MyPages />} />
            <Route path="/reform" element={<Reform />} />
            <Route path="/PurchaserInfo" element={<PurchaserInfo />} />
            <Route path="/PurchaserReformInfo/:estimateNumber" element={<PurchaserReformInfo />} />
            <Route path="/PurchaserMyPage" element={<PurchaserMyPage />} />
            <Route path="/reformCompleted/:progressNumber" element={<ReformCompleted />} />
            <Route path="/Mypage/PurchaserInfoEdit" element={<PurchaserInfoEdit />} />
            <Route path="/Mypage/PurchaserInfoEdit/PurchaserPNumberEdit" element={<PurchaserPNumberEdit />} />
            <Route path="/Mypage/PurchaserInfoEdit/PurchaserPasswordEdit" element={<PurchaserPasswordEdit />} />
            <Route path="/Mypage/PurchaserInfoEdit/PurchaserAddressEdit" element={<PurchaserAddressEdit />} />
            <Route path="/PortfolioList" element={<PortfolioList />} />
            <Route path="/Mypage/Designer/Estimate/:requestNumber" element={<DesignerWriteEstimate />} />
            <Route path="ConfigurationManagement/:estimateId" element={<ConfigurationManagement />} />
            <Route path="designer/:designerName" element={<DesignerSelect />} />
            <Route path="/test/:estimateNumber" element={<Test />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
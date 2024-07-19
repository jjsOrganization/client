import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

const App = () => {

const PortfolioList = lazy(() => import("./pages/PortfolioList.js"));
const PurchaserAddressEdit = lazy(() => import("./component/PurchaserAddressEdit.js"));
const PurchaserPasswordEdit = lazy(() => import("./component/PurchaserPasswordEdit.js"));
const PurchaserPNumberEdit = lazy(() => import("./component/PurchaserPNumberEdit.js"));
const PurchaserInfoEdit = lazy(() => import("./pages/PurchaserInfoEdit.js"));
const PurchaserMyPage = lazy(() => import("./pages/PurchaserMyPage.js"));
const PurchaserInfo = lazy(() => import("./pages/PurchaserInfo.js"));
const Login = lazy(() => import("./pages/Login.js"));
const Visual = lazy(() => import("./pages/Visual.js"));
const Reform = lazy(() => import("./pages/Reform.js"));
const ProductList = lazy(() => import("./pages/ProductList.js"));
const PurchaserMypageDelivery = lazy(() => import("./pages/PurchaserMyPageDelivery.js"));
const DesignerSearch = lazy(() => import("./pages/DesignerSearch"));
const DesignerMypage = lazy(() => import("./pages/DesignerMypage.js"));
const ModifyPortfolio = lazy(() => import("./pages/ModifyPortfolio.js"));
const RegisterPortfolio = lazy(() => import("./pages/RegisterPortfolio.js"));
const Signup = lazy(() => import("./pages/Signup.js"));
const Detail = lazy(() => import("./pages/Detail.js"));
const ProductUpdate = lazy(() => import("./pages/productRegistration.js"));
const StockUpdater = lazy(() => import("./pages/stockUpdater.js"));
const MyPages = lazy(() => import("./pages/mypage.js"));
const Main = lazy(() => import("./pages/main.js"));
const DesignerWriteEstimate = lazy(() => import("./component/DesignerWriteEstimate.js"));
const PurchaserReformInfo = lazy(() => import("./pages/PurchaserReformInfo.js"));
const ConfigurationManagement = lazy(() => import("./pages/designerConfigurationManagement.js"));
const ReformCompleted = lazy(() => import("./pages/reformComplete.js"));
const DesignerSelect = lazy(() => import("./pages/DesignerSelect.js"));

  return (
    <div>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="visual" element={<Visual />} />
          <Route path="products/:page?" element={<ProductList />} />
          <Route path="/mypage/delivery/:index" element={<PurchaserMypageDelivery />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/designers/:page?" element={<DesignerSearch />} />
          <Route path="/designermypage" element={<DesignerMypage />} />
          <Route path="/designermypage/modifyportfolio/:portfolioId" element={<ModifyPortfolio />} />
          <Route path="/designermypage/modifyportfolio/registerportfolio" element={<RegisterPortfolio />} />
          <Route path="/" element={<Main />} />
          <Route path="/detail/:productid" element={<Detail />} />
          <Route path="/productupdate" element={<ProductUpdate />} />
          <Route path="/stockupdater/:productid" element={<StockUpdater />} />
          <Route path="/mypage" element={<MyPages />} />
          <Route path="/reform" element={<Reform />} />
          <Route path="/purchaserinfo" element={<PurchaserInfo />} />
          <Route path="/purchaserreforminfo/:estimateNumber" element={<PurchaserReformInfo />} />
          <Route path="/purchasermypage" element={<PurchaserMyPage />} />
          <Route path="/reformcompleted/:progressNumber" element={<ReformCompleted />} />
          <Route path="/mypage/purchaserinfoedit" element={<PurchaserInfoEdit />} />
          <Route path="/mypage/purchaserinfoedit/purchaserpnumberedit" element={<PurchaserPNumberEdit />} />
          <Route path="/mypage/purchaserinfoedit/purchaserpasswordedit" element={<PurchaserPasswordEdit />} />
          <Route path="/mypage/purchaserinfoedit/purchaseraddressedit" element={<PurchaserAddressEdit />} />
          <Route path="/portfoliolist" element={<PortfolioList />} />
          <Route path="/mypage/designer/estimate/:requestNumber" element={<DesignerWriteEstimate />} />
          <Route path="configurationmanagement/:estimateId" element={<ConfigurationManagement />} />
          <Route path="designer/:designerName" element={<DesignerSelect />} />
        </Routes>
      </Suspense>
    
    </div>
  );
};

export default App;
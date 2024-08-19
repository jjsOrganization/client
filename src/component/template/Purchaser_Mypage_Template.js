import React from "react";
import Order_List from "../molecules/Purchaser_Mypage/Order_List.js";
import Reform_List from "../molecules/Purchaser_Mypage/Reform_List.js";
import Chat from "../molecules/Purchaser_Mypage/Chat.js";
import TopBar from "../TopBar.js";
import Shopping_Basket from "../molecules/Purchaser_Mypage/Shopping_Basket.js";

const Purchaser_Mypage = ({
  chatOpen,
  messageData,
  msg,
  setMsg,
  closeChat,
  purchaserEmail,
  postMessage,

  purchaserOrderProducts,
  showMore,
  showMoreForReform,
  renderOrderStatus,
  handleShowMore,
  handleShowMoreForReform,

  purchaserReformProducts,
  fetchEstimateData,
  requestNumberEstimate,
  estimateAccept,
  estimateReject,
  openChat,
  estimateNumber,

  open,
  setOpen,
  customerShoppingBasket,
  setProductCount,
  handleCheckboxChange,
  handleDelete,
  totalPriceOfCheckedItems,
  handleOrder,

  handlePurchaserInfoEdit
}) => {
  return (
    <div>
      <TopBar />
      <div className="purchaserOrderReformProduct">
        <Order_List
          purchaserOrderProducts={purchaserOrderProducts}
          showMore={showMore}
          renderOrderStatus={renderOrderStatus}
          handleShowMore={handleShowMore}
        />

        <Reform_List
          purchaserReformProducts={purchaserReformProducts}
          fetchEstimateData={fetchEstimateData}
          requestNumberEstimate={requestNumberEstimate}
          estimateAccept={estimateAccept}
          estimateReject={estimateReject}
          showMoreForReform={showMoreForReform}
          handleShowMoreForReform={handleShowMoreForReform}
        />

        <Chat
          chatOpen={chatOpen}
          messageData={messageData}
          msg={msg}
          setMsg={setMsg}
          closeChat={closeChat}
          purchaserEmail={purchaserEmail}
          openChat={openChat}
          estimateNumber={estimateNumber}
          postMessage = {postMessage}
        />

        <Shopping_Basket
          open={open}
          setOpen={setOpen}
          customerShoppingBasket={customerShoppingBasket}
          setProductCount={setProductCount}
          handleCheckboxChange={handleCheckboxChange}
          handleDelete={handleDelete}
          totalPriceOfCheckedItems={totalPriceOfCheckedItems}
          handleOrder={handleOrder}
        />
      </div>
      <div className="UserCorrection">
        <button onClick={handlePurchaserInfoEdit}>회원정보 수정하기</button>
      </div>
    </div>
  );
};

export default Purchaser_Mypage;

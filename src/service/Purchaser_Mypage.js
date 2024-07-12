import React, { useState, useEffect } from "react";
import Purchaser_Mypage_Template from "../component/template/Purchaser_Mypage_Template.js";
import {
  postAxios,
  getAxios,
  patchAxios,
  deleteAxios,
} from "../component/Axios";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Purchaser_Mypage = () => {
  const [orderList, setOrderList] = useState([]);
  const [open, setOpen] = useState(true);
  const [customerShoppingBasket, setCustomerShoppingBasket] = useState([]);
  let navigate = useNavigate();

  const [purchaserOrderProducts, setPurchaserOrderProducts] = useState([]);
  const [purchaserReformProducts, setPurchaserReformProducts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState();
  const [purchaserEmail, setPurchaserEmail] = useState();
  const [connected, setConnected] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [estimateNumber, setEstimateNumber] = useState(null);
  const [requestNumberEstimate, setRequestNumberEstimate] = useState(null);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const responsePurchase = await getAxios("/order/purchaser-list", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(responsePurchase);

        const responseReform = await getAxios(
          "/reform/purchaser/requests/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const reformData = responseReform.data.data;
        const reformArray = [];
        for (const reformRequest of reformData) {
          if (reformRequest.requestStatus !== "REQUEST_REJECTED") {
            reformArray.push(reformRequest);
          }
        }
        setPurchaserReformProducts(reformArray);

        const purchaseData = responsePurchase.data.data;
        console.log(purchaseData);
        setPurchaserOrderProducts(purchaseData);
      } catch (error) {}
    };

    const fetchProducts = async () => {
      try {
        const response = await getAxios("/cart/purchaser", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = response.data;
        setCustomerShoppingBasket(
          data.data.map((product) => ({
            ...product,
            totalPrice: product.price,
            checked: false, // 기본적으로 모든 상품은 체크되지 않은 상태로 설정
          }))
        );
      } catch (error) {}
    };

    fetchOrderList();
    fetchProducts();
    test();
  }, []);

  const test = async () => {
    try {
      const fetchData = await getAxios(`/progress/img/1`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(fetchData);
    } catch (err) {}
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handlePurchaserInfoEdit = () => {
    navigate("/mypage/purchaserInfoEdit");
  };

  // 각 주문 상태에 대한 렌더링 함수
  function renderOrderStatus(orderStatus) {
    switch (orderStatus) {
      case "ORDER_COMPLETE":
        return "주문접수 완료";
      case "SHIPPING":
        return "배송중";
      case "DELIVERED":
        return "배송완료";
      case "CANCELLED":
        return "주문취소됨";
      case "REFUNDED":
        return "환불완료";
      default:
        return orderStatus;
    }
  }

  const handleOrder = async () => {
    try {
      const selectedProducts = customerShoppingBasket.filter(
        (product) => product.checked
      );

      const orderDTO = {
        orderDetails: selectedProducts.map((product) => ({
          productId: product.id,
          quantity: product.count,
        })),
        postcode: "",
        address: "",
        detailAddress: "",
        phoneNumber: "",
        deliveryRequest: "",
      };

      await postAxios(`/cart/purchaser/order`, orderDTO, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      for (const product of selectedProducts) {
        await handleDelete(product.id);
      }
      navigate("/PurchaserInfo");
    } catch (error) {}
  };

  const handleDelete = async (productId) => {
    try {
      await deleteAxios(`/cart/purchaser/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setCustomerShoppingBasket((prevBasket) =>
        prevBasket.filter((product) => product.id !== productId)
      );
    } catch (error) {}
  };

  const totalPriceOfCheckedItems = customerShoppingBasket
    .filter((product) => product.checked)
    .reduce((total, product) => total + product.price * product.count, 0);

  const setProductCount = (productId, newCount) => {
    setCustomerShoppingBasket((prevBasket) =>
      prevBasket.map((product) => {
        if (product.id === productId) {
          const count = Math.max(newCount, 0);
          const totalPrice = count === 0 ? 0 : product.price * count;
          return { ...product, count, totalPrice };
        }
        return product;
      })
    );
  };

  const handleCheckboxChange = (productId) => {
    setCustomerShoppingBasket((prevBasket) =>
      prevBasket.map((product) => {
        if (product.id === productId) {
          return { ...product, checked: !product.checked };
        }
        return product;
      })
    );

    setOrderList((prevOrderList) => {
      const selectedProduct = prevOrderList.find(
        (product) => product.id === productId
      );
      if (!selectedProduct) {
        const addedProduct = customerShoppingBasket.find(
          (product) => product.id === productId
        );
        return [...prevOrderList, addedProduct];
      } else {
        return prevOrderList.filter((product) => product.id !== productId);
      }
    });
  };

  const fetchRoomData = async (requestN) => {
    try {
      const response = await getAxios(`/chatroom`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const roomDataArray = response.data.data;
      for (const roomData of roomDataArray) {
        if (requestN === roomData.requestId) {
          setPurchaserEmail(roomData.purchaserEmail);
          setRoomId(roomData.roomId);
          setConnected(true);
          break;
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchRoomData();
  }, [roomId]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };

  useEffect(() => {
    if (connected && chatOpen && roomId) {
      connect();
      fetchMessageData();
    }
  }, [connected, chatOpen, roomId]);

  useEffect(() => {
    if (connected) {
      const fetchDataInterval = setInterval(() => {
        fetchMessageData();
      }, 1000); // 1초마다 데이터를 불러옴

      return () => clearInterval(fetchDataInterval);
    }
  }, [connected, messageData]);

  const connect = () => {
    const socket = new SockJS("석수동");
    const stompClient = Stomp.over(socket);

    if (stompClient && stompClient.connected) {
      return;
    }

    stompClient.connect(headers, () => {
      setStompClient(stompClient);
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  const fetchMessageData = async () => {
    try {
      const response = await getAxios(`/chatroom/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMessageData(response.data.data);
    } catch (error) {}
  };

  const disconnectWebSocket = () => {
    if (stompClient) {
      stompClient.disconnect();
      setStompClient(null);
      setConnected(false);
    } else {
    }
  };

  const postMessage = () => {
    if (stompClient) {
      const message = {
        roomId: roomId,
        sender: purchaserEmail,
        message: msg,
      };
      const messageJSON = JSON.stringify(message);
      stompClient.send("/pub/chat/message", {}, messageJSON);
      setMsg("");

      setMessageData([
        ...messageData,
        { sender: purchaserEmail, message: msg },
      ]);
    } else {
      console.error("WebSocket 연결이 없습니다.");
    }
  };

  const fetchEstimateData = async (requestNumber, event) => {
    try {
      const response = await getAxios(
        `/estimate/purchaser/estimateForm/${requestNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = response.data.data;
      setEstimateNumber(data.estimateNumber);
      setRequestNumberEstimate(data.requestNumber);

      if (!event) {
        return response;
      } else if (data !== null) {
        const popupWindow = window.open(
          `estimateNumber`,
          `estimateNumber`,
          "width=600,height=400"
        );
        popupWindow.document.write(`
        <h1>제출된 견적서</h1>
        <p><strong>의뢰자 이메일:</strong> ${data.clientEmail}</p>
        <p><strong>디자이너 이메일:</strong> ${data.designerEmail}</p>
        <p><strong>견적서 정보:</strong> ${data.estimateInfo}</p>
        <p><strong>제시한 가격:</strong> ${data.price}</p>
        <p><strong>제시된 가격:</strong> ${data.totalPrice}</p>
      `);
      } else {
        alert("견적서가 아직 제출되지 않았습니다.");
      }
    } catch (error) {}
  };

  const estimateReject = async () => {
    try {
      const response = await patchAxios(
        `/estimate/purchaser/${estimateNumber}/reject`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("견적을 거절했습니다.");
    } catch (error) {}
  };

  const estimateAccept = async () => {
    try {
      const response = await postAxios(
        `/estimate/purchaser/${estimateNumber}/accept`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("견적을 수락했습니다. 배송지 입력 페이지로 이동합니다.");
      navigate(`/PurchaserReformInfo/${estimateNumber}`);
    } catch (error) {}
  };

  const openChat = (requestN) => {
    fetchRoomData(requestN);
    setChatOpen(true);
  };

  const closeChat = () => {
    disconnectWebSocket();
    setChatOpen(false);
  };

  return (
    <div>
      <Purchaser_Mypage_Template
        chatOpen={chatOpen}
        messageData={messageData}
        msg={msg}
        setMsg={setMsg}
        closeChat={closeChat}
        purchaserEmail={purchaserEmail}
        purchaserOrderProducts={purchaserOrderProducts}
        showMore={showMore}
        renderOrderStatus={renderOrderStatus}
        handleShowMore={handleShowMore}
        purchaserReformProducts={purchaserReformProducts}
        fetchEstimateData={fetchEstimateData}
        requestNumberEstimate={requestNumberEstimate}
        estimateAccept={estimateAccept}
        estimateReject={estimateReject}
        openChat={openChat}
        estimateNumber={estimateNumber}
        open={open}
        setOpen={setOpen}
        customerShoppingBasket={customerShoppingBasket}
        setProductCount={setProductCount}
        handleCheckboxChange={handleCheckboxChange}
        handleDelete={handleDelete}
        totalPriceOfCheckedItems={totalPriceOfCheckedItems}
        handleOrder={handleOrder}
        handlePurchaserInfoEdit={handlePurchaserInfoEdit}
      />
    </div>
  );
};

export default Purchaser_Mypage;

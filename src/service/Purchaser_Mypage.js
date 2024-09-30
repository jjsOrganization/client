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
import { useMutation, useQuery } from "react-query";
import store from "../store.js";
import { useTokenStore } from "../store.js";

const Purchaser_Mypage = () => {
  let navigate = useNavigate();
  const accessToken = useTokenStore((state) => state.accessToken)
  
  const [customerShoppingBasket, setCustomerShoppingBasket] = useState([]);
  const {
    requestN,
    orderList,
    open,
    // customerShoppingBasket,
    purchaserOrderProducts,
    purchaserReformProducts,
    showMore,
    showMoreForReform,
    msg,
    messages,
    stompClient,
    roomId,
    purchaserEmail,
    connected,
    chatOpen,
    messageData,
    estimateNumber,
    requestNumberEstimate,
    isNull,

    setIsNull,
    setRequestN,
    setOrderList,
    setOpen,
    // setCustomerShoppingBasket,
    setPurchaserOrderProducts,
    setPurchaserReformProducts,
    setShowMore,
    setShowMoreForReform,
    setMsg,
    setMessages,
    setStompClient,
    setRoomId,
    setPurchaserEmail,
    setConnected,
    setChatOpen,
    setMessageData,
    setEstimateNumber,
    setRequestNumberEstimate,
  } = store.usePurchaserMypageStore();


  const {
    isLoading: isPurchaseLoading,
    data: purchaseData,
    error: purchaseError,
  } = useQuery({
    queryKey: ["purchaserList"],
    queryFn: () =>
      getAxios("/order/purchaser-list", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    onSuccess: (response) => {
      setPurchaserOrderProducts(response.data.data);
    },
  });

  const {
    isLoading: isReformLoading,
    data: reformData,
    error: reformError,
  } = useQuery({
    queryKey: ["reformRequests"],
    queryFn: () =>
      getAxios("/reform/purchaser/requests/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    onSuccess: (response) => {
      const reformArray = response.data.data.filter(
        (reformRequest) => reformRequest.requestStatus !== "REQUEST_REJECTED"
      );
      setPurchaserReformProducts(reformArray);
    },
  });

  const {
    isLoading: isCartPurchaseLoading,
    data: cartData,
    error: cartError,
  } = useQuery({
    queryKey: ["cartPurchase"],
    queryFn: () =>
      getAxios("/cart/purchaser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    onSuccess: (response) => {
      const data = response.data;
      setCustomerShoppingBasket(
        data.data.map((product) => ({
          ...product,
          totalPrice: product.price,
          checked: false,
        }))
      );
    },
  });

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowMoreForReform = () => {
    setShowMoreForReform(true);
  };

  const handlePurchaserInfoEdit = () => {
    navigate("/mypage/purchaserInfoEdit");
  };

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

  const { mutate: handleOrder } = useMutation({
    mutationFn: () => {
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

      postAxios(`/cart/purchaser/order`, orderDTO, {});

      return selectedProducts;
    },
    onSuccess: (selectedProducts) => {
      for (const product of selectedProducts) {
        console.log(product.id);
        handleDelete(product.id);
      }
      navigate("/PurchaserInfo");
    },
    onError: (error) => {},
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: (productId) => {
      deleteAxios(`/cart/purchaser/delete/${productId}`, {
      });
      return productId;
    },
    onSuccess: (productId) => {
      setCustomerShoppingBasket((prevBasket) =>
        prevBasket.filter((product) => product.id !== productId)
      );
    },
    onError: (error) => {},
  });

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

  const {
    isLoading: isFetchRoomDataLoading,
    data: fetchRoomData,
    error: fetchRoomDataError,
  } = useQuery(
    ["fetchRoomData", requestN],
    async () => {
      const response = await getAxios("/chatroom", {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    },
    {
      onSuccess: (response) => {
        const roomDataArray = response.data.data;
        for (const roomData of roomDataArray) {
          if (requestN === roomData.requestId) {
            setPurchaserEmail(roomData.purchaserEmail);
            setRoomId(roomData.roomId);
            setConnected(true);
            break;
          }
        }
      },
    }
  );

  const headers = {
    Authorization: `Bearer ${accessToken}`,
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
    const socket = new SockJS("http://3.38.128.50:8080/ws/chat");
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
          Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data.data;

      if (data !== null) {
        setIsNull(false); // 견적서가 있는 경우
        setEstimateNumber(data.estimateNumber);
        setRequestNumberEstimate(data.requestNumber);
      } else {
        setIsNull(true); // 견적서가 없는 경우
      }

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
    } catch (error) {
      console.error("견적서 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const estimateReject = async () => {
    try {
      const response = await patchAxios(
        `/estimate/purchaser/${estimateNumber}/reject`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("견적을 수락했습니다. 배송지 입력 페이지로 이동합니다.");
      navigate(`/PurchaserReformInfo/${estimateNumber}`);
    } catch (error) {}
  };

  // const openChat = (requestN) => {
  //   setChatOpen(true);
  // };

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
        showMoreForReform={showMoreForReform}
        renderOrderStatus={renderOrderStatus}
        handleShowMore={handleShowMore}
        handleShowMoreForReform={handleShowMoreForReform}
        purchaserReformProducts={purchaserReformProducts}
        fetchEstimateData={fetchEstimateData}
        requestNumberEstimate={requestNumberEstimate}
        estimateAccept={estimateAccept}
        estimateReject={estimateReject}
        // openChat={openChat}
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
        postMessage={postMessage}
      />
      <button onClick = {console.log(accessToken)}>dad</button>
    </div>
  );
};

export default Purchaser_Mypage;

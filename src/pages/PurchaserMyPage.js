import React, { Fragment, useEffect, useState } from "react";
import "../css/PurchaserMyPage.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Dialog, Transition } from "@headlessui/react";
import TopBar from "../component/TopBar.js";

function CustomerOrderList() {
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
        const responsePurchase = await axiosInstance.get(
          "/order/purchaser-list",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const responseReform = await axiosInstance.get(
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
        setPurchaserOrderProducts(purchaseData);
      } catch (error) {}
    };

    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/cart/purchaser", {
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
  }, []);

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

      await axiosInstance.post(`/cart/purchaser/order`, orderDTO, {
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
      await axiosInstance.delete(`/cart/purchaser/delete/${productId}`, {
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
      const response = await axiosInstance.get(`/chatroom`, {
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
    const socket = new SockJS("");
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
      const response = await axiosInstance.get(`/chatroom/${roomId}`, {
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

  const fetchEstimateData = async (requestNumber) => {
    try {
      const response = await axiosInstance.get(
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

      if (data !== null) {
        const popupWindow = window.open(`estimateNumber`, `estimateNumber`, "width=600,height=400");
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
      const response = await axiosInstance.patch(
        `/estimate/purchaser/${estimateNumber}/reject`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("견적을 거절했습니다.");
    } catch (error) {

    }
  };

  const estimateAccept = async () => {
    try {
      const response = await axiosInstance.post(
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
      <TopBar />
      <div className="purchaserOrderReformProduct">
        <h1 style={{ marginLeft: "15%" }}>마이페이지</h1>
        <div className="purchaserOrederedProduct">
          <h4>구매목록</h4>
          <hr></hr>
          {purchaserOrderProducts
            .slice(0, showMore ? undefined : 2)
            .map((product, index) => (
              <div key={product.id}>
                <h5>
                  {product.orderDate[0]}년 {product.orderDate[1]}월{" "}
                  {product.orderDate[2]} 일
                </h5>
                <img
                  src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.imgUrl}`}
                  alt={product.name}
                />
                <p>주문상태 : {renderOrderStatus(product.orderStatus)}</p>
                <p>제품명 : {product.productName}</p>
                <p>수량 : {product.quantity}</p>
                <p>가격 : {product.price}원</p>
                <p>
                  배송현황 : {product.state}{" "}
                  <button
                    className="OrderedBTN"
                    onClick={() => {
                      navigate(`/mypage/delivery/${index}`);
                    }}
                  >
                    자세히
                  </button>
                </p>
                <hr></hr>
              </div>
            ))}
          {!showMore && (
            <button className="OrderedMoreBTN" onClick={handleShowMore}>
              더보기
            </button>
          )}
        </div>

        <div className="purchaserReformedProduct">
          <h4>리폼목록</h4>
          <hr></hr>
          {purchaserReformProducts
            .slice(0, showMore ? undefined : 2)
            .map((product) => (
              <div key={product.id}>
                <h5>리폼 의뢰를 요청한 디자이너 : {product.designerName}</h5>
                <img
                  src={`${product.requestImg[0].imgUrl}`}
                  alt={product.name}
                />
                <p>요청부위 : {product.requestPart}</p>
                <p>요청사항 : {product.requestInfo}</p>
                <p>가격 : {product.requestPrice}원</p>
                <p>상태 : {product.requestStatus}</p>
                <p>
                  견적서 확인 : {product.state}{" "}
                  <button
                    className="OrderedBTN"
                    onClick={() => {
                      fetchEstimateData(product.id);
                    }}
                  >
                    자세히
                  </button>
                  {requestNumberEstimate === product.id && (
                    <>
                      <button
                        className="OrderedBTN"
                        onClick={() => {
                          estimateAccept();
                        }}
                      >
                        수락
                      </button>

                      <button
                        className="OrderedBTN"
                        onClick={() => {
                          estimateReject();
                        }}
                      >
                        거절
                      </button>
                    </>
                  )}
                </p>

                <p>
                  1대1 채팅 : {product.id}{" "}
                  <button
                    className="OrderedBTN"
                    onClick={() => {
                      openChat(product.id);
                    }}
                  >
                    시작
                  </button>
                </p>
                <hr></hr>
              </div>
            ))}
          {!showMore && (
            <button className="OrderedMoreBTN" onClick={handleShowMore}>
              더보기
            </button>
          )}
        </div>
        {chatOpen ? (
          <div className="chat-container">
            <h1>메세지</h1>
            <div className="message-container">
              <h2>채팅내역:</h2>
              {messageData.map((data, index) => (
                <div
                  className={`message ${
                    data.sender === purchaserEmail ? "right" : "left"
                  }`}
                  key={index}
                >
                  <p>
                    <strong>{data.sender}:</strong> {data.message}
                  </p>
                </div>
              ))}
              <input
                className="message-input"
                type="text"
                value={msg}
                placeholder="메시지"
                onChange={(e) => setMsg(e.target.value)}
              />
              <button className="send-button" onClick={postMessage}>
                메시지 보내기
              </button>
              <button className="close-button" onClick={closeChat}>
                채팅방 연결 종료
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="UserCorrection">
        <button onClick={handlePurchaserInfoEdit}>회원정보 수정하기</button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    {/* 다이얼로그 내용 */}
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      {/* 다이얼로그 헤더 */}
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            장바구니
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {/* 장바구니 내용 */}
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {/* 상품 목록 */}
                              {customerShoppingBasket.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.productImgs[0].imgUrl}`}
                                      alt={product.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        갯수 :
                                        <button
                                          className="basketCountButton"
                                          style={{
                                            padding: "0.25rem 0.5rem",
                                            fontSize: "0.75rem",
                                          }}
                                          onClick={() =>
                                            setProductCount(
                                              product.id,
                                              product.count - 1
                                            )
                                          }
                                          disabled={
                                            product.checked ||
                                            product.count <= 0
                                          }
                                        >
                                          -
                                        </button>
                                        {product.count}
                                        <button
                                          className="basketCountButton"
                                          onClick={() =>
                                            setProductCount(
                                              product.id,
                                              product.count + 1
                                            )
                                          }
                                          disabled={product.checked}
                                        >
                                          +
                                        </button>
                                      </p>

                                      <div className="flex">
                                        {/* 상품 체크박스 */}
                                        <label className="customCheckbox">
                                          <input
                                            type="checkbox"
                                            checked={product.checked}
                                            onChange={() =>
                                              handleCheckboxChange(product.id)
                                            }
                                            style={{
                                              transform: "scale(1.5)",
                                              marginRight: "10px",
                                              marginTop: "10px",
                                            }}
                                          />
                                        </label>

                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleDelete(product.id)
                                          }
                                        >
                                          삭제하기
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* 다이얼로그 푸터 */}
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>선택한 상품 총액: {totalPriceOfCheckedItems}</h3>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          체크박스 선택시 가격이 자동으로 계산됩니다.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            onClick={handleOrder}
                          >
                            주문하기
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              장바구니 닫기
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default CustomerOrderList;

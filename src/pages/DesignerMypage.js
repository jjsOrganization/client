import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

export function DesignerMypage() {
  const [isRegister, setIsRegister] = useState(true);
  const [designerProfile, setDesignerProfile] = useState([]);
  const [designerPortfolioResult, setDesignerPortfolioresult] = useState([]);
  const [requestReform, setRequestReform] = useState([]);
  const [chatInfo, setChatInfo] = useState([]);
  let navigate = useNavigate();
  const [roomExist, setRoomExist] = useState(true);
  const [msg, setMsg] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [roomIds, setRoomIds] = useState();
  const [designerEmail, setDesignerEmail] = useState();
  const [connected, setConnected] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messageData, setMessageData] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };

  useEffect(() => {
    if (connected && chatOpen && roomIds) {
      connect();
      fetchMessageData();
    }
  }, [connected, chatOpen, roomIds]);

  const fetchDesignerMypage = async () => {
    try {
      const responseDesignerInfo = await axiosInstance.get(
        "/portfolio/designer",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const infoData = responseDesignerInfo.data;
      setDesignerProfile(infoData);
    } catch (error) {
      setIsRegister(false);
    }
  };

  const fetchDesignerPortfolio = async () => {
    try {
      const response = await axiosInstance.get("/product/all", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = response.data;
      setDesignerPortfolioresult(
        data.data.map((product) => ({
          ...product,
        }))
      );
    } catch (error) {}
  };

  const fetchRequestReform = async () => {
    try {
      const response = await axiosInstance.get(
        `estimate/designer/requestForm`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = response.data.data;
      setRequestReform(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequestReform();
    fetchDesignerMypage();
    fetchDesignerPortfolio();
  }, []);

  const handleChangeStatus = async (requestId, newStatus) => {
    try {
      const response = await axiosInstance.post(
        `/estimate/designer/requestForm/${requestId}`,
        { clientResponse: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {}
  };

  const fetchRoomData = async (requestNumber) => {
    let roomExists = false;
    try {
      const response = await axiosInstance.get(`/chatroom`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const roomDataArray = response.data.data;
      for (const roomData of roomDataArray) {
        if (requestNumber === roomData.requestId) {
          roomExists = true;
          setRoomIds(roomData.roomId);
          setDesignerEmail(roomData.designerEmail);
          break;
        }
      }
    } catch (error) {}
    if (roomExists === true) {
      setConnected(true);
      openChat();
    } else {
      fetchRequestReformDetailAndStartChat(requestNumber);
    }
  };

  const fetchRequestReformDetailAndStartChat = async (requestNumber) => {
    try {
      const response = await axiosInstance.get(
        `estimate/designer/requestForm/${requestNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = response.data.data;
      setRoomExist(false);

      const chatIn = {
        roomId: 0,
        purchaserEmail: data[0].purchaserEmail,
        designerEmail: data[0].designerEmail,
        productNumber: data[0].productNumber,
        requestNumber: data[0].requestNumber,
      };
      setChatInfo(chatIn);
    } catch (error) {}
  };

  const handleStartChat = async () => {
    try {
      if (!roomExist) {
        if (chatInfo) {
          const chatInfoToSend = {
            roomId: 0,
            purchaserEmail: chatInfo.purchaserEmail,
            designerEmail: chatInfo.designerEmail,
            productCode: chatInfo.productNumber,
            requestId: chatInfo.requestNumber,
          };

          const response = await axiosInstance.post(
            `/chatroom`,
            chatInfoToSend,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          setRoomExist(false);
        } else {
        }
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleStartChat();
  }, [chatInfo, roomExist]);

  const connect = () => {
    const socket = new SockJS("");
    const stompClient = Stomp.over(socket);

    if (stompClient && stompClient.connected) {
      return;
    }

    stompClient.connect(headers, () => {
      setStompClient(stompClient);
      stompClient.subscribe(`/sub/chat/room/${roomIds}`, (message) => {
        const newMessage = JSON.parse(message.body);
      });
    });
  };

  useEffect(() => {
    fetchMessageData();
  }, [messageData]);

  const fetchMessageData = async () => {
    try {
      const response = await axiosInstance.get(`/chatroom/${roomIds}`, {
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
        roomId: roomIds,
        sender: designerEmail,
        message: msg,
      };
      const messageJSON = JSON.stringify(message);
      stompClient.send("/pub/chat/message", {}, messageJSON);
      setMsg("");

      setMessageData([...messageData, { sender: designerEmail, message: msg }]);
    } else {
    }
  };

  const openChat = () => {
    setChatOpen(true);
  };

  const closeChat = () => {
    disconnectWebSocket();
    setChatOpen(false);
  };

  const handleDesignerInfoEdit = () => {
    navigate("/DesignerMyPage/ModifyPortfolio/EditPortfolio");
  };

  const handleDesignerInfoRegister = () => {
    navigate("/DesignerMyPage/ModifyPortfolio/RegisterPortfolio");
  };

  const openWriteEstimate = () => {
    window.open(
      "/Mypage/Designer/Estimate",
      "WriteEstimate",
      "width=400,height=400"
    );
  };

  return (
    <div>
      <TopBar />
      <div className="flex flex-col justify-center">
        <>
          <div className="relative mt-2 h-72 w-full overflow-hidden rounded-xl">
            <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
          </div>
          <Card className="mx-auto -mt-16 mb-0 border border-blue-gray-100 items-center w-full max-w-[80rem]">
            {isRegister ? (
              <>
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-20 w-2/5 shrink-0 rounded-r-none"
                >
                  <img
                    src={`${designerProfile.designerImagePath}`}
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40 h-96 w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="p-4 -mt-10 ">
                  <Typography variant="h3" color="blue-gray" className="mb-2">
                    {`${designerProfile.designerName}`}
                    <Tooltip content="Edit Profile">
                      <PencilIcon
                        className="h-5 w-5 cursor-pointer text-blue-gray-500 ml-2"
                        onClick={() => {
                          handleDesignerInfoEdit();
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <Typography color="gray" className="mb-8 font-normal">
                    {`${designerProfile.explanation}`}
                  </Typography>
                  <Typography color="gray" className="mb-8 font-normal">
                    {`${designerProfile.designerEmail}`}
                  </Typography>
                </CardBody>
              </>
            ) : (
              <>
                <CardBody
                  shadow={false}
                  floated={false}
                  className=" m-20 shrink-0 rounded-r-none "
                >
                  <div
                    type="button"
                    className="flex justify-center items-center rounded-md bg-gray-900/75 w-60 h-14 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      handleDesignerInfoRegister();
                    }}
                  >
                    포트폴리오 등록하기
                  </div>
                </CardBody>
              </>
            )}
          </Card>
          <Card className="mx-auto mt-5 mb-6 border border-blue-gray-100  w-full max-w-[80rem]">
            <div className="px-4 pb-4 mt-3">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                Architects design
              </Typography>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                {designerPortfolioResult.map((product) => (
                  <div
                    key={product.productName}
                    color="transparent"
                    shadow={false}
                  >
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.imgUrl}`}
                        alt={product.productName}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {product.itemDetail}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <div
                        variant="outlined"
                        size="sm"
                        onClick={() => {
                          navigate("/DesignerMyPage");
                        }}
                      >
                        view proj
                      </div>
                    </CardFooter>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card className="mx-auto mt-5 mb-6 border border-blue-gray-100 items-center w-full max-w-[80rem]">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                리폼 진행 현황
              </Typography>
              {requestReform
                .filter((reform) => reform.requestStatus !== "REQUEST_REJECTED")
                .map((reform, index) => (
                  <div key={index} className="mb-4">
                    <img
                      src={reform.requestImg[0].imgUrl}
                      alt="Request Image"
                      className="w-full h-auto mb-2"
                      style={{ maxHeight: "200px", maxWidth: "200px" }}
                    />
                    <Typography variant="body" color="blue-gray">
                      요청 정보: {reform.requestInfo}
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                      요청 부분: {reform.requestPart}
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                      요청 가격: {reform.requestPrice}
                    </Typography>
                    {reform.requestStatus !== "REQUEST_WAITING" ? (
                      <div>
                        {/* 첫 번째 버튼 */}
                        <button
                          onClick={() => {
                            fetchRoomData(reform.requestNumber);
                          }}
                          style={{
                            backgroundColor: "lightblue",
                            color: "white",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "10px", // 첫 번째 버튼과의 간격을 위한 스타일
                          }}
                        >
                          채팅방 생성 또는 시작
                        </button>
                        {/* 두 번째 버튼 */}
                        <button
                          onClick={() => {
                            openWriteEstimate();
                          }}
                          style={{
                            backgroundColor: "darkblue",
                            color: "white",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          견적서 작성
                        </button>
                      </div>
                    ) : null}
                    {/* 요청이 수락되지 않은 경우 상태 변경을 위한 드롭다운 메뉴를 표시합니다. */}
                    {reform.requestStatus !== "REQUEST_ACCEPTED" &&
                      reform.requestStatus !== "REQUEST_REJECTED" && (
                        <select
                          value={reform.requestStatus}
                          onChange={(e) =>
                            handleChangeStatus(
                              reform.requestNumber,
                              e.target.value
                            )
                          }
                          className="mt-2 px-3 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          <option value="REQUEST_WAITING">리폼 요청</option>
                          <option value="수락">리폼 승인</option>
                          <option value="거절">리폼 거절</option>
                        </select>
                      )}
                  </div>
                ))}
            </CardBody>
          </Card>
        </>
        /
      </div>
      <div>
        {chatOpen ? (
          <div>
            <h1>WebSocket 통신</h1>
            <button onClick={closeChat}>WebSocket 연결 끊기</button>
            <div>
              <h2>Messages:</h2>
              {messageData.map((data, index) => (
                <div key={index}>
                  <p>
                    {data.sender}: {data.message}
                  </p>
                </div>
              ))}
              <input
                type="text"
                value={msg}
                placeholder="메시지"
                onChange={(e) => setMsg(e.target.value)}
              />
              <button onClick={postMessage}>메시지 보내기</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DesignerMypage;
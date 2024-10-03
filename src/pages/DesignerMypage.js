import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { TailWindButton } from "../component/atoms/Button.js";
import { TailWindDropdown } from "../component/organism/DropDown.js";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import store from "../store.js";
import { useTokenStore } from "../store.js";

export function DesignerMypage() {
  const [estimateStatus, setEstimateStatus] = useState([]);
  const accessToken = useTokenStore((state) => state.accessToken);
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
  const [reformList, setReformList] = useState();
  const estimateId = [];
  const [dropdownMenu, setDropDownMenu] = useState([
    "리폼 요청",
    "리폼 승인",
    "리폼 거절",
  ]);
  const [choiceMenu, setChoiceMenu] = useState("리폼 요청");
  const lightBlueBtn =
    "bg-lightblue text-white py-2 px-3 border-none rounded cursor-pointer";
  const darkBlueBtn =
    "bg-darkblue text-white py-1.5 px-3 rounded cursor-pointer ml-2";

  const dropDownChange = (choice) => {
    if (choice == "리폼 요청") {
      setChoiceMenu("리폼 요청");
    } else if (choice == "리폼 승인") {
      setChoiceMenu("리폼 승인");
    } else if (choice == "리폼 거절") {
      setChoiceMenu("리폼 거절");
    }
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const fetchDesignerMypage = async () => {
    try {
      const responseDesignerInfo = await axiosInstance.get(
        "/portfolio/designer"
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
          Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRequestReform(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequestReform();
    fetchDesignerMypage();
    fetchDesignerPortfolio();
    reformCompletedGet();
  }, []);

  const handleChangeStatus = async (requestId, newStatus) => {
    try {
      const response = await axiosInstance.post(
        `/estimate/designer/requestForm/${requestId}`,
        { clientResponse: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
    } finally {
      fetchRequestReform();
    }
  };

  const fetchRoomData = async (requestNumber) => {
    let roomExists = false;
    try {
      const response = await axiosInstance.get(`/chatroom`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data);
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
                Authorization: `Bearer ${accessToken}`,
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
    const socket = new SockJS("http://3.38.128.50:8080/ws/chat");
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

  const fetchMessageData = async () => {
    try {
      const response = await axiosInstance.get(`/chatroom/${roomIds}`, {
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

  const openWriteEstimate = (requestNumber) => {
    window.open(
      `/Mypage/Designer/Estimate/${requestNumber}`,
      "WriteEstimate",
      "width=600,height=750"
    );
  };

  const submitWriteEstimate = async (requestNumber) => {
    try {
      const request = await axiosInstance.patch(
        `/estimate/designer/estimateForm/${requestNumber}/submit`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {}
  };

  const fetchEstimateData = async (requestNumber, Id) => {
    try {
      const response = await axiosInstance.get(
        `/estimate/designer/estimateForm/${requestNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data.data;
      const R = data.estimateStatus;
      estimateId[Id] = data.estimateNumber;
      setEstimateStatus((prevEstimateStatus) => ({
        ...prevEstimateStatus,
        [data.requestNumber]: data.estimateStatus,
      }));
      return R;
    } catch (error) {
      throw new Error("오류로 견적서 내용을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    if (connected && chatOpen && roomIds) {
      connect();
    }
  }, [connected, chatOpen, roomIds]);

  useEffect(() => {
    if (connected) {
      const fetchDataInterval = setInterval(() => {
        fetchMessageData();
      }, 1000); // 1초마다 데이터를 불러옴

      // 의존성이 변경될 때마다 interval을 클리어하여 메모리 누수를 방지
      return () => clearInterval(fetchDataInterval);
    }
  }, [connected, messageData]);

  const reformCompletedGet = async () => {
    try {
      const completedResponse = await axiosInstance.get(
        `/portfolio/reformOutput/designer/list`
      );
      setReformList(completedResponse.data.data);
    } catch (error) {}
  };

  if (!reformList) {
    return <div>이미지 로드중</div>;
  }
  console.log(estimateStatus);
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
                <CardHeader className="m-20 w-2/5 shrink-0 rounded-r-none">
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
                <CardBody className=" m-20 shrink-0 rounded-r-none ">
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

          <Card className="mx-auto mt-5 mb-6 border border-blue-gray-100 items-center w-full max-w-[80rem]">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                리폼 진행 현황
              </Typography>
              {requestReform
                .filter((reform) => reform.requestStatus !== "REQUEST_REJECTED")
                .map((reform, index) => {
                  const status = estimateStatus[reform.requestNumber]; // Get the status for this request number
                  return (
                    <div key={index} className="mb-4">
                      <img
                        src={reform.requestImg[0].imgUrl}
                        alt="Request Image"
                        className="w-full h-auto mb-2"
                        style={{ maxHeight: "200px", maxWidth: "200px" }}
                        onLoad={() =>
                          fetchEstimateData(reform.requestNumber, index)
                        }
                      />
                      <Typography color="blue-gray">
                        요청 정보: {reform.requestInfo}
                      </Typography>
                      <Typography color="blue-gray">
                        요청 부분: {reform.requestPart}
                      </Typography>
                      <Typography color="blue-gray">
                        요청 가격: {reform.requestPrice}
                      </Typography>

                      {/* Conditionally render buttons based on status */}
                      {status === "REQUEST_ACCEPTED" ? (
                        <div>
                          <TailWindButton
                            className={lightBlueBtn}
                            onClick={() => fetchRoomData(reform.requestNumber)}
                          >
                            채팅방 생성 또는 시작
                          </TailWindButton>
                          <TailWindButton
                            className={darkBlueBtn}
                            onClick={() =>
                              navigate(
                                `/ConfigurationManagement/${estimateId[index]}`
                              )
                            }
                          >
                            진행상황 공유
                          </TailWindButton>
                        </div>
                      ) : status === "WRITING" || status === undefined ? (
                        <div>
                          <TailWindButton
                            className={darkBlueBtn}
                            onClick={() =>
                              openWriteEstimate(reform.requestNumber)
                            }
                          >
                            견적서 작성
                          </TailWindButton>
                          <TailWindButton
                            className={darkBlueBtn}
                            onClick={() =>
                              submitWriteEstimate(reform.requestNumber)
                            }
                          >
                            견적서 제출
                          </TailWindButton>
                        </div>
                      ) : status === "REQUEST_WAITING" ? (
                        <div>
                          <h5>견적서가 제출되고 최증승인을 기다리고 있습니다.</h5>
                        </div>
                      ):null}

                      {/* Dropdown for status changes */}
                      {reform.requestStatus !== "REQUEST_ACCEPTED" &&
                        reform.requestStatus !== "REQUEST_REJECTED" && (
                          <TailWindDropdown
                            requestNumber={reform.requestNumber}
                            handleChangeStatus={handleChangeStatus}
                            handleCategoryChange={dropDownChange}
                            selectedCategory={choiceMenu}
                            setselectedCategory={setChoiceMenu}
                            dropdownMenu={dropdownMenu}
                          />
                        )}
                      <hr />
                    </div>
                  );
                })}
            </CardBody>
          </Card>
        </>
      </div>
      <div>
        {chatOpen ? (
          <div className="chat-container">
            <h1>메세지</h1>
            <div className="message-container">
              <h2>채팅내역:</h2>
              {messageData.map((data, index) => (
                <div
                  className={`message ${
                    data.sender === designerEmail ? "right" : "left"
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
    </div>
  );
}

export default DesignerMypage;

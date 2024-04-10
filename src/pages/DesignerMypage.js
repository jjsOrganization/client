import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

export function DesignerMypage() {
  const [isRegister, setIsRegister] = useState(true);
  const [designerProfile, setDesignerProfile] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [designerPortfolioResult, setDesignerPortfolioresult] = useState([]);
  const [requestReform, setRequestReform] = useState([]);
  const [reformStatus, setReformStatus] = useState();
  const [chatInfo, setChatInfo] = useState([]);
  const [requestNumber, setRequestNumber] = useState();
  let navigate = useNavigate();
  const [roomExist, setRoomExist] = useState(false);

  useEffect(() => {
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
        // console.log(infoData);
        setDesignerProfile(infoData);
      } catch (error) {
        setIsRegister(false);
        console.log("데이터 로드 실패", error);
      }
    };

    const fetchDesignerPortfolio = async () => {
      try {
        const response = await axiosInstance.get("/product/all", {
          // 디자이너 포트폴리오 게시물 전체 조회 uri
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
        ); // 첫 4개의 포트폴리오만 가져오도록 수정
      } catch (error) {
        // console.log("포트폴리오 작업물 조회 실패", error);
      }
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
        console.log(data);
        setReformStatus(data.requestStatus);
        setRequestReform(data);
        setRequestNumber(data.requestNumber);
      } catch (error) {
        console.log("리폼요청 조회 실패", error);
      }
    };
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
      console.log("요청 상태가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.log("요청 상태 변경 실패:", error);
    }
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
          break;
        } else {
          roomExists = false;
        }
      }
    } catch (error) {
      console.log("오류.", error);
    }
    console.log(roomExists);
    if (roomExists) {
      setRoomExist(true);
      handleClickChatButton();
    } else {
      setRoomExist(false);
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
      console.log(data);

      const chatIn = {
        roomId: 0,
        purchaserEmail: data[0].purchaserEmail,
        designerEmail: data[0].designerEmail,
        productNumber: data[0].productNumber,
        requestNumber: data[0].requestNumber,
      };
      console.log(chatIn);

      setChatInfo(chatIn);
    } catch (error) {
      console.log("조회 실패", error);
    }
    
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
          console.log("채팅방 생성 완료");
          setRoomExist(false);
        } else {
          console.log("채팅 정보가 올바르게 설정되지 않았습니다.");
        }
      } else {
        console.log("이미 채팅방이 존재합니다.");
      }
    } catch (error) {
      console.log("채팅방 생성 실패:", error);
    }
  };

  useEffect(() => {
    handleStartChat();
  }, [chatInfo, roomExist]);

  const handleClickChatButton = () => {
    // 채팅을 시작하는 로직을 여기에 작성하세요.
    console.log("채팅을 시작합니다.");
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleDesignerInfoEdit = () => {
    navigate("/DesignerMyPage/ModifyPortfolio/EditPortfolio");
  };

  const handleDesignerInfoRegister = () => {
    navigate("/DesignerMyPage/ModifyPortfolio/RegisterPortfolio");
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
                    {/* 채팅방 정보의 requestNumber와 요청 번호가 일치하는지 확인하여 조건에 따라 버튼을 생성합니다. */}
                    {chatInfo &&
                    chatInfo.requestNumber === reform.requestNumber ? (
                      <button
                        onClick={handleClickChatButton}
                        style={{
                          backgroundColor: "lightblue",
                          color: "white",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        채팅시작
                      </button>
                    ) : (
                      <button
                        onClick={() => fetchRoomData(reform.requestNumber)}
                        style={{
                          backgroundColor: "lightblue",
                          color: "white",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        채팅방생성 또는 채팅시작
                      </button>
                    )}
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
    </div>
  );
}

export default DesignerMypage;

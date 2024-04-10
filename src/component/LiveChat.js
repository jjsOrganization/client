import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axiosInstance from "./jwt.js";

const WebSocketComponent = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState();
  const [purchaserEmail, setPurchaserEmail] = useState();
  const [designerEmail, setDesignerEmail] = useState();
  const [connected, setConnected] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messageData, setMessageData] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };

  useEffect(() => {
    if (connected && chatOpen && roomId) {
      connect();
      fetchMessageData();
    }
  }, [connected, chatOpen, roomId]);

  const connect = () => {
    const socket = new SockJS("http://3.38.128.50:8080/ws/chat");
    const stompClient = Stomp.over(socket);

    if (stompClient && stompClient.connected) {
      console.log("이미 WebSocket에 연결되어 있습니다.");
      return;
    }

    stompClient.connect(headers, () => {
      console.log("WebSocket에 연결됨");
      setStompClient(stompClient);
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        console.log("Received:", JSON.parse(message.body).content);
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(message.body),
        ]);
      });
    });
  };

  const fetchRoomData = async () => {
    try {
      const response = await axiosInstance.get(`/chatroom`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setRoomId(response.data.data[0].roomId);
      setPurchaserEmail(response.data.data[0].purchaserEmail);
      setDesignerEmail(response.data.data[0].designerEmail);
      console.log(response.data.data);
      console.log(roomId);
      console.log(purchaserEmail);
      console.log(designerEmail);
      setConnected(true);
    } catch (error) {
      console.log("정보가 없습니다.", error);
    }
  };

  const fetchMessageData = async () => {
    try {
      const response = await axiosInstance.get(`/chatroom/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMessageData(response.data.data);
    } catch (error) {
      console.log("정보가 없습니다.", error);
    }
  };

  const disconnectWebSocket = () => {
    if (stompClient) {
      stompClient.disconnect();
      console.log("WebSocket 연결이 해제되었습니다.");
      setStompClient(null);
      setConnected(false);
    } else {
      console.log("WebSocket 연결이 이미 해제되었습니다.");
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
  
      setMessageData([...messageData, { sender: purchaserEmail, message: msg }]);
    } else {
      console.error("WebSocket 연결이 없습니다.");
    }
  };

  const openChat = () => {
    fetchRoomData();
    setChatOpen(true);
  };

  const closeChat = () => {
    disconnectWebSocket();
    setChatOpen(false);
  };

  return (
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
      ) : (
        // 채팅창이 닫혀 있을 때
        <button onClick={openChat}>정보 가져오기 및 연결</button>
      )}
    </div>
  );
};

export default WebSocketComponent;

// stomp.connect(
//   {},
//   (frame) => {
//     console.log("Connected: " + frame);
//     setStompClient(stomp);
//     stomp.subscribe("sub/chat/room/3", (message) => {
//       console.log("R :", JSON, parse(message.body).content);
//       // setMessages((prevMessages) => [
//       //   ...prevMessages,
//       //   JSON.parse(message.body),
//       // ]);
//     });
//   },
//   (error) => {
//     console.error("Connection error:", error);
//   }
// );

// const connectWebSocket = () => {
//   const socket = new XMLHttpRequest();
//   const socket = new WebSocket("http://3.38.128.50:8080/ws/chat");
//   socket.onreadystatechange = function () {
//     if (socket.readyState === 4 && socket.status === 200) {
//       console.log("WebSocket 연결 성공!");
//       socket.onmessage = function (event) {
//         const message = event.data;
//         setMessages((prevMessages) => [...prevMessages, message]);
//       };
//     } else {
//       console.error("WebSocket 연결 실패");
//     }
//   };
//   socket.open("GET", "http://3.38.128.50:8080/ws/chat");
//   socket.send("POST", "http://3.38.128.50:8080/pub/chat/message");
//   setSocket(socket);
// };
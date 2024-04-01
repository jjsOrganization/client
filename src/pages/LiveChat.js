import React, { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axiosInstance from "../pages/jwt.js";
import { parse } from "postcss";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState();
  const [purchaserEmail, setPurchaserEmail] = useState();
  const [designerEmail, setDesignerEmail] = useState();
  const [socket, setSocket] = useState(null);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };

  const connect = () => {
    const socket = new SockJS("ws://3.38.128.50:8080/ws/chat/websocket");
    const stompClient = Stomp.over(socket);

    stompClient.connect(headers, () => {

      stompClient.subscribe("/sub/chat/room/3", (message) => {
        console.log("Received:", JSON.parse(message.body).content);
      });

      const message = { roomId: roomId, sender: purchaserEmail, message: "오전1시35분" };
      const messageJSON = JSON.stringify(message);
      stompClient.send("/pub/chat/message", messageJSON);

    });

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
  };

  const connectWebSocket = () => {
    // const socket = new XMLHttpRequest();
    const socket = new WebSocket("http://3.38.128.50:8080/ws/chat");
    socket.onreadystatechange = function () {
      if (socket.readyState === 4 && socket.status === 200) {
        console.log("WebSocket 연결 성공!");
        socket.onmessage = function (event) {
          const message = event.data;
          setMessages((prevMessages) => [...prevMessages, message]);
        };
      } else {
        console.error("WebSocket 연결 실패");
      }
    };
    // socket.open("GET", "http://3.38.128.50:8080/ws/chat");
    // socket.send("POST", "http://3.38.128.50:8080/pub/chat/message");
    setSocket(socket);
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
      console.log(roomId);
      console.log(purchaserEmail);
      console.log(designerEmail);
    } catch (error) {
      console.log("정보가 없습니다.", error);
    }
  };

  const disconnectWebSocket = () => {
    if (stompClient) {
      stompClient.disconnect();
      console.log("WebSocket 연결이 해제되었습니다.");
      setStompClient(null);
    } else {
      console.log("WebSocket 연결이 이미 해제되었습니다.");
    }
  };

  return (
    <div>
      <h1>WebSocket 통신</h1>
      <button onClick={connect}>WebSocket 연결</button>
      <button onClick={fetchRoomData}>정보가져오기</button>
      <button onClick={disconnectWebSocket}>WebSocket 연결 끊기</button>
      <button onClick={postMessage}>메세지 보내기</button>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;

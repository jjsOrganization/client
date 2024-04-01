import React, { useState } from "react";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const connectWebSocket = () => {
    const socket = new XMLHttpRequest();
    socket.onreadystatechange = function() {
      if (socket.readyState === 4 && socket.status === 200) {
        console.log("WebSocket 연결 성공!");
        socket.onmessage = function(event) {
          const message = event.data;
          setMessages(prevMessages => [...prevMessages, message]);
        };
      } else {
        console.error("WebSocket 연결 실패");
      }
    };
    socket.open("GET", "http://3.38.128.50:8080/ws/chat");
    socket.send("POST", "http://3.38.128.50:8080/pub/chat/message");
    setSocket(socket);
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.abort();
      console.log("WebSocket 연결이 해제되었습니다.");
      setSocket(null);
    } else {
      console.log("WebSocket 연결이 이미 해제되었습니다.");
    }
  };

  const sendMessage = () => {
    if (socket) {
      const roomId = "1"; // Change this with your room ID
      const sender = "kim"; // Change this with sender name
      const message = "소켓연결된거냐?"; // Change this with your message
      const data = JSON.stringify({ roomId, sender, message });
      socket.open("POST", "http://3.38.128.50:8080/pub/chat/message");
      socket.setRequestHeader("Content-Type", `Bearer ${localStorage.getItem("accessToken")}`);
      socket.send(data);
    } else {
      console.error("WebSocket 연결이 되어있지 않습니다.");
    }
  };

  return (
    <div>
      <h1>WebSocket 통신</h1>
      <button onClick={connectWebSocket}>WebSocket 연결</button>
      <button onClick={disconnectWebSocket}>WebSocket 연결 끊기</button>
      <button onClick={sendMessage}>메세지 보내기</button>
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
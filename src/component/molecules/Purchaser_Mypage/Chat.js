import React from "react";

const Chat = ({ chatOpen = true, messageData=[], msg, setMsg, closeChat, purchaserEmail, postMessage }) => {
  return (
    <div>
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
  );
};

export default Chat;

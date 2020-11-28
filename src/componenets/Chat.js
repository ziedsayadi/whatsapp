import React, { useState } from "react";
import "./chat.css";
import { IconButton, Avatar } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "axios";
const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const sendMessage =  (e) => {
    e.preventDefault();
     axios.post("/api/messages/new", {
      message: input,
      name: "big guy",
      timestamp: "right now",
      recived: true,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAePHGk4zQacrlExygB4QUQlmSmCR9Qxd1Sw&usqp=CAU" />
        <div className="chat_headerInfo">
          <h3>Zied Sayadi</h3>
          <p>This is just a test</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.recived && "chat_reciver"}`}>
            <span className="chat_name">{message.name} </span>
            {message.message}{" "}
            <span className="chat_time">{message.timestamp}</span>
          </p>
        ))}
      </div>
      ;
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="type a message"
            className="chat_input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="chat_button">
            send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;

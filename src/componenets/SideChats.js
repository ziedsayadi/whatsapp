import React from "react";
import './sideChats.css'
import { Avatar } from "@material-ui/core";

const SideChat = () => {
  return (
    <div className="sidebare_chat">
      <Avatar></Avatar>
      <div className="sidebare_info">
        <h3>Adham smith</h3>
        <p>this side bar is static</p>
      </div>
    </div>
  );
};

export default SideChat;

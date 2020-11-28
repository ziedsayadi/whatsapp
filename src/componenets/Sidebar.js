import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { IconButton, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SideChat from "./SideChats";
const Sidebar = () => {
  return (
    <div className="side-bar">
      <div className="sidebar_header">
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAePHGk4zQacrlExygB4QUQlmSmCR9Qxd1Sw&usqp=CAU" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon></DonutLargeIcon>
          </IconButton>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon></SearchIcon>
          <input type="text" placeholder="Search user" value="Adham smith"></input>
        </div>
      </div>
      <div className="sidebare_chats">
        <SideChat />
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import "./App.css";
import Sidebar from "./componenets/Sidebar";
import Chat from "./componenets/Chat";
import { useEffect } from "react";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios
      .get("/api/all_messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const pusher = new Pusher("9b814bda4cf9673089eb", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [messages]);
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

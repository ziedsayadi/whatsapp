// All the imports
const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./Dbmessages.js");
const Pusher = require("pusher");
const cors = require("cors");
// app config

const app = express();
const port = process.env.PORT || 5000;

// pusher middlewear config
const pusher = new Pusher({
  appId: "1071963",
  key: "9b814bda4cf9673089eb",
  secret: "188aac8523e900d32584",
  cluster: "eu",
  encrypted: true,
});

//middlewear
//**** parsing data ****
app.use(express.json());
//*** access *****
app.use(cors());
// Db conncetion
const password_Db = "CjylE8xEeOsNBUNZ";
const connection_URL = `mongodb+srv://admin:${password_Db}@cluster0.uact8.mongodb.net/whatsapp_DB?retryWrites=true&w=majority`;
mongoose
  .connect(connection_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database is runing"))
  .catch((err) => console.log(err));

//  DB watching
const db = mongoose.connection;
db.once("open", () => {
  console.log("....Db_connected");
  const msgCollection = db.collection("messages");
  const changeSteam = msgCollection.watch();
  changeSteam.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const msgDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        name: msgDetails.name,
        message: msgDetails.message,
        timestamp:msgDetails.timestamp,
        recived : msgDetails.recived
      });
    } else {
      console.log("error with pusher");
    }
  });
});
// api route

// Posting Messages
app.post("/api/messages/new", (req, res) => {
  const messagebdy = req.body;
  try {
    Messages.create(messagebdy, (err, data) => {
      err
        ? status(500).console.log("fail to send data")
        : res.status(201).send(data);
    });
  } catch (error) {
    console.error(error);
  }
});

// Getting Messages
app.get("/api/all_messages", (req, res) => {
  try {
    Messages.find((err, data) => {
      err ? res.status(500).send(err) : res.status(200).send(data);
    });
  } catch (error) {
    console.error(error);
  }
});
// listn

app.listen(port, () => console.log(`...server is runing at port ${port} `));

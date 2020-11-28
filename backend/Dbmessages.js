// import mongoose
const mongoose = require("mongoose");

// creatining Schemas

const whatsAppSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  recived: Boolean,
});

module.exports = mongoose.model("messages", whatsAppSchema);

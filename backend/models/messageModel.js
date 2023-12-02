const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    //   messageId: String, => autogenerated
    chatId: String,
    senderId: String,
    content: String,
    image: Buffer,
    messageType: String,
    sentAt: { type: Date, default: Date.now() },
});
const messageModel = mongoose.model("messages", messageSchema);

module.exports = messageModel;

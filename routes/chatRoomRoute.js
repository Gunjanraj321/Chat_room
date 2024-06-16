const express = require("express");
const router = express.Router();

const {
  createRoom,
  joinRoom,
  getAllChatRoom,
  getChatRoomById,
  getMyChatRooms
} = require("../controllers/groupController.js.js");
const { getMessages } = require("../controllers/messageController.js");

router.post("/chatrooms", createRoom);
router.get("/chatrooms", getAllChatRoom);
router.get("/chatrooms/my", getMyChatRooms);
router.get("/chatrooms/:id", getChatRoomById);
router.post("/joinroom", joinRoom);
router.get("/messages/:roomId", getMessages);

module.exports = router;

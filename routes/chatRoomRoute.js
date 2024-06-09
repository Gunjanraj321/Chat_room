const express = require("express");
const router = express.Router();

const {
  createRoom,
  getChatRoom,
  joinRoom,
} = require("../controllers/chatController.js");
const { getMessages } = require("../controllers/messageController.js");

router.post("/chatrooms", createRoom);
router.get("/chatrooms", getChatRoom);
router.post("/joinroom", joinRoom);
router.get("/messages/:roomId", getMessages);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  sendFriendRequest,
  getAllFriendRequestNotifications,
  acceptFriendRequest,
  declineFriendRequest,
} = require("../controllers/friendReqController.js");

router.get("/getFriendRequestNotification", getAllFriendRequestNotifications);
router.post("/friend-requests/:receiver_id", sendFriendRequest);
router.patch("/friend-requests/:receiver_id", acceptFriendRequest);
router.delete("/friend-requests/:receiver_id", declineFriendRequest);

module.exports = router;

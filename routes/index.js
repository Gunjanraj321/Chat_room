const express = require('express');

const {verify} = require("../middleware/verifyToken");
const profileRoute = require("./profileRoute");
const signRoute = require("./userSignRoute");
const chatRoomRoute = require('./chatRoomRoute');
const friendsRequestRoute = require('./friendsRequestRoute');

const router = express.Router();

router.use("/api/auth", signRoute);
router.use("/api", verify, profileRoute);
router.use("/api", verify, chatRoomRoute);
router.use("/api", verify, friendsRequestRoute);

module.exports = router;
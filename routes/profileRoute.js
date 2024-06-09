const express = require("express");
const router = express.Router();

const {
  upgradePremium,
  getAllUsers,
  getFriendsList,
  editAbout,
  editImgUrl,
  getProfile,
  
} = require("../controllers/profileController.js");

router.patch("/upgrade", upgradePremium);
router.get("/profile", getProfile);
router.get("/userlist", getAllUsers);   //userlist -- friendreq, create group
router.get("/friendslist", getFriendsList);
router.patch("/about", editAbout);
router.patch("/imgUrl", editImgUrl)

module.exports = router;

const { Op } = require("sequelize");
const User = require("../models/user");
const FriendShip = require("../models/FriendReq");

// Send a friend request
const sendFriendRequest = async (req, res) => {
  const receiverId = req.params.receiver_id;
  const senderId = req.user.userId;

  try {
    const existingRequest = await FriendShip.findOne({
      where: {
        senderId,
        receiverId,
        status: false,
      },
    });
    if (existingRequest) {
      return res.status(404).json({
        message: "Friend request already sent",
        status: existingRequest.status,
      });
    }

    await FriendShip.create({ senderId, receiverId });
    return res.status(201).json({
      message: "Friend request sent successfully",
    });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending friend request." });
  }
};

// Get friend request notifications
const getAllFriendRequestNotifications = async (req, res) => {
  const senderId = req.user.userId;

  try {
    const notifications = await FriendShip.findAll({
      where: {
        receiverId: senderId,
        status: false,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "receiverId", "senderId"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedNotifications = notifications.map((notification) => {
      return {
        id: notification.User.id,
        name: notification.User.name,
        email: notification.User.email,
        status: notification.status,
      };
    });

    return res.status(201).json(formattedNotifications);
  } catch (error) {
    console.error("Error getting friend request notifications:", error);
    res.status(500).json({
      error: "An error occurred while getting friend request notifications.",
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  const receiverId = req.user.userId;
  const senderId = req.params.receiver_id;
  try {
    const userReq = await FriendShip.findOne({
      where: { senderId: senderId, receiverId: receiverId, status: false },
    });
    if (!userReq) {
      return res.status(404).json({ error: "Friend request not found." });
    }
    const [updatedRows] = await FriendShip.update(
      { status: true },
      {
        where: {
          senderId: senderId,
          receiverId: receiverId,
          status: false,
        },
      }
    );
    if (updatedRows === 0) {
      return res.status(404).json({
        error: "Friend request not found or already accepted.",
      });
    }
    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error accepting friend request", error });
  }
};

const declineFriendRequest = async (req, res) => {
  const receiverId = req.user.userId;
  const senderId = req.params.receiver_id;

  try {
    const userReq = await FriendShip.findOne({
      where: { senderId: senderId, receiverId: receiverId, status: false },
    });
    if (!userReq) {
      return res.status(404).json({ error: "Friend request not found." });
    }

    const affectedRow = await FriendShip.destroy({
      where: { senderId: senderId, receiverId: receiverId, status: false },
    });
    if (affectedRow === 0) {
      return res.status(404).json({ error: "Friend request not declined." });
    }

    res.status(200).json({ message: "Friend request declined" });
  } catch (error) {
    res.status(500).json({ message: "Error declining friend request", error });
  }
};



module.exports = {
  sendFriendRequest,
  getAllFriendRequestNotifications,
  acceptFriendRequest,
  declineFriendRequest,
};

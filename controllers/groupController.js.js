const { Sequelize } = require("sequelize");
const Group = require("../models/Group");
const User = require("../models/user");

const createRoom = async (req, res) => {
  const adminId = req.user.userId;

  try {
    const { roomName, membersId } = req.body;
    const user = await User.findOne({ where: { id: adminId } });

    if (!user.isPrimeMember) {
      console.log(user.isPrimeMember);
      return res
        .status(403)
        .json({ message: "Only prime members can create chat rooms" });
    }

    const existingRoom = await Group.findOne({ where: { roomName } });
    if (existingRoom) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const room = await Group.create({
      roomName: roomName,
      AdminId: adminId,
      membersNo: membersId.length,
    });

    membersId.push(adminId);

    await room.addUsers(membersId.map((ele) => Number(ele)));

    res.status(201).json({ message: "Chat room created successfully", room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllChatRoom = async (req, res) => {
  try {
    const allChatRoom = await Group.findAll();
    res.status(200).json(allChatRoom);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getChatRoomById = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await Group.findOne({ where: { id: roomId } });
    if (!room) {
      return res.status(404).json({ error: "room not found" });
    }
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};

const getMyChatRooms = async (req, res) => {
  const userId = req.user.userId;
  try {
    const userSpecificRooms = await Group.findAll({
      include: [
        {
          model: User,
          through: {
            where: { UserId: userId },
            attribute: ["name","id","imgUrl"]
          },
        },
      ],
      attribute: ["id","roomName"]

    });

    const adminRooms = await Group.findAll({
      where: { adminId: userId },
      attribute: ["id","roomName"],
    });

    // Combine both lists and remove duplicates if any
    const allRooms = [...userSpecificRooms, ...adminRooms];
    const uniqueRooms = Array.from(
      new Set(allRooms.map((room) => room.id))
    ).map((id) => allRooms.find((room) => room.id === id));

    res.status(200).json(uniqueRooms);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving chat rooms" });
  }
};

const joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ where: { userId: userId } });
    const chatRoom = await Group.findByPk(roomId);

    if (!User && !chatRoom) {
      return res.status(404).json({ message: "Chat room or user not found" });
    }

    const userChatRoomsCount = await user.countChatRooms();

    if (user.isPrimeMember || userChatRoomsCount < 1) {
      await chatRoom.addUser(userId);
      return res.status(200).json({ message: "User added successfully" });
    } else {
      if (user.availCoins < 150) {
        return res
          .status(403)
          .json({ message: "Not enough coins to join additional rooms" });
      }
      user.availCoins -= 150;
      await user.save();
      await chatRoom.addUser(userId);
      return res
        .status(200)
        .json({ message: "User added successfully after deducting coins" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createRoom, getAllChatRoom, joinRoom, getMyChatRooms,getChatRoomById };

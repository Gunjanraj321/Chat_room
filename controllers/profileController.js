const { Op, where } = require("sequelize");
const User = require("../models/user");
const FriendShip = require("../models/FriendReq");

const getProfile = async (req, res) => {
  const id = req.user.userId;

  try {
    const user = await User.findOne({ where: { id: id }
      , attributes:["name", "about", "email", "imgUrl","availCoins","isPrimeMember"] }    
    );
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};

const editAbout = async (req, res) => {
  const userId = req.user.userId;
  const { about } = req.body;
  console.log(userId, about)
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const [updatedRows] =await User.update(
      { about: about },
      {
        where: {
          id: userId,
        },
      }
    );
    if (updatedRows === 0) {
      return res.status(409).json({ error: "about not updated" });
    }
    return res.status(202).json({ message: "About updated successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server error", error });
  }
};

const editImgUrl = async (req, res) => {
  const userId = req.user.userId;
  const { imgUrl } = req.body;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const [updatedRows] =await User.update(
      { imgUrl: imgUrl },
      {
        where: {
          id: userId,
        },
      }
    );
    if (updatedRows === 0) {
      return res.status(409).json({ error: "Image not updated" });
    }
    return res.status(202).json({ message: "Image updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
      where: {
        id: { [Op.ne]: req.user.userId },
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching users." });
  }
};

const getFriendsList = async (req, res) => {
  const userId = req.user.userId;

  try {
    const friends = await FriendShip.findAll({
      where: {
        status: true,
        receiverId: userId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    const friendsList = friends.map((friend) => {
      return {
        id: friend.User.id,
        name: friend.User.name,
        email: friend.User.email,
        status: friend.status,
      };
    });

    console.log(friendsList);
    res.status(200).json(friendsList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching friends list", error: err });
  }
};

const upgradePremium = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isPrimeMember) {
      return res
        .status(400)
        .json({ message: "User is already a prime member" });
    }

    user.isPrimeMember = true;
    await user.save();

    res
      .status(200)
      .json({ message: "User upgraded to prime member successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getProfile,
  upgradePremium,
  getFriendsList,
  getAllUsers,
  editAbout,
  editImgUrl
};

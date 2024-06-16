require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const router = require("./routes/index");

const modelRelation = require("./models/index");
const socketHandler = require("./routes/SocketHandler");
const sequelize = require("./utils/db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON:", err);
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

async function initiate() {
  try {
    // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    const res = await sequelize.sync({force:false});   
    // await sequelize.query("SET FOREIGN_KEY_CHECKS = 1"); 
    console.log("DB connected");
    server.listen(3001, () => {
      console.log(`Server Running at 3001`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

initiate();

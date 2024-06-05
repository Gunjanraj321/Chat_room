 
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

const { sequelize } = require('./utils/dbUtils');

app.use(express.json());

app.use('/api',authRoutes);

const port = process.env.PORT || 3000;

async function initiate() {
    try {
      await sequelize.sync()
      console.log("db connected")
      app.listen(port, () => {
        console.log(`Server is running at ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  initiate();
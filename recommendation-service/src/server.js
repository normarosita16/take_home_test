require('dotenv').config();
const app = require('./app');
const { sequelize } = require('../models');
const redisClient = require('./cache/redisClient');

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  console.log(`Recommendation service running on port ${PORT}`);

  // Connect to DB
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // Connect to Redis
  try {
    await redisClient.connect();
    console.log('Redis connected successfully.');
  } catch (error) {
    console.error('Redis connection error:', error);
  }
});

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  ADMIN_EMAIL_API_KEY: process.env.ADMIN_EMAIL_API_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL,
  TO_EMAIL: process.env.TO_EMAIL
}
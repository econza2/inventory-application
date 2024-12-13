const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  database: process.env.DATABASE_NAME,
  password: process.env.USER_PASSWORD,
  port: parseInt(process.env.PORT_NUMBER),
});

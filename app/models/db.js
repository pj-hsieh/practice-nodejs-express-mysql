const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const host = process.env.DB_HOST || dbConfig.host;
const user = process.env.DB_USER || dbConfig.user;
const password = process.env.DB_PASSWORD || dbConfig.password;
const database = process.env.DB_NAME || dbConfig.database;

var connection = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database
});

module.exports = connection;
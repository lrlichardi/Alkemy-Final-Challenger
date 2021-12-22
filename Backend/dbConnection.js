// Conection DB
const { Pool } = require("pg");

const pool = new Pool({
    host: `${process.env.localhost}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
  });

module.exports = pool
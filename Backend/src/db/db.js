const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("DB connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };

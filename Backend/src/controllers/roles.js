const { pool } = require("../db/db");

const getAllRoles = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT role FROM roles WHERE role = 'premium user' OR role = 'free user'"
    );
    res.json(result.rows.map((row) => row.role));
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ status: "error", msg: "cannot get roles" });
  }
};

module.exports = { getAllRoles };

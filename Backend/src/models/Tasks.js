const { pool } = require("../db/db");

const createTaskTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      priority VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      due_date DATE NOT NULL,
      username VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Task table created successfully");
  } catch (error) {
    console.error("Error creating task table:", error.message);
  }
};

module.exports = { createTaskTable };

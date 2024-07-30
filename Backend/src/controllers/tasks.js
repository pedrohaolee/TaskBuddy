const { pool } = require("../db/db");

const getAllTasks = async (req, res) => {
  const username = req.body.email;

  try {
    const result = await pool.query("SELECT * FROM tasks WHERE username = $1", [
      username,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

const addNewTask = async (req, res) => {
  const {
    title,
    category,
    priority,
    description,
    due_date,
    username,
    completed,
  } = req.body;

  if (
    !title ||
    !category ||
    !priority ||
    !description ||
    !due_date ||
    !username
  ) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const query = `
        INSERT INTO tasks (title, category, priority, description, due_date, username, completed, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
      `;
    await client.query(query, [
      title,
      category,
      priority,
      description,
      due_date,
      username,
      completed,
    ]);
    await client.query("COMMIT");
    res.status(201).json({ msg: "Task created successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating task:", error.message);
    res.status(500).json({ msg: "Error creating task" });
  } finally {
    client.release();
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, category, priority, description, due_date } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "UPDATE tasks SET title = COALESCE($1, title), category = COALESCE($2, category), priority = COALESCE($3, priority), description = COALESCE($4, description), due_date = COALESCE($5, due_date), updated_at = NOW() WHERE id = $6 RETURNING *",
      [title, category, priority, description, due_date, id]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ status: "error", msg: "Task not found" });
    }
    await client.query("COMMIT");
    res.json({ status: "success", task: result.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating task:", error);
    res.status(500).json({ status: "error", msg: "Failed to update task" });
  } finally {
    client.release();
  }
};

const getPremiumFreeUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT email, role, created_at, status FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ status: "error", msg: "Failed to fetch users" });
  }
};

const updateUserStatus = async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(
      "UPDATE users SET status = $1 WHERE email = $2 RETURNING *",
      [status, email]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ status: "error", msg: "User not found" });
    }
    await client.query("COMMIT");
    res.json({ status: "success", user: result.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating user status:", error);
    res
      .status(500)
      .json({ status: "error", msg: "Failed to update user status" });
  } finally {
    client.release();
  }
};

const dashboardTasks = async (req, res) => {
  try {
    const email = req.body.email;
    const result = await pool.query(
      `SELECT 
          COUNT(*) FILTER (WHERE completed = false) AS pending_tasks_count,
          COUNT(*) FILTER (WHERE completed = true) AS completed_tasks_count,
          COUNT(*) FILTER (WHERE due_date >= NOW()) AS upcoming_tasks_count,
          ARRAY_AGG(
            json_build_object(
              'id', id,
              'title', title,
              'description', description,
              'due_date', due_date,
              'priority', priority,
              'category', category,
              'completed', completed
            )
          ) FILTER (WHERE completed = false) AS pending_tasks,
          ARRAY_AGG(
            json_build_object(
              'id', id,
              'title', title,
              'description', description,
              'due_date', due_date,
              'priority', priority,
              'category', category,
              'completed', completed
            )
          ) FILTER (WHERE completed = true) AS completed_tasks,
          ARRAY_AGG(
            json_build_object(
              'id', id,
              'title', title,
              'description', description,
              'due_date', due_date,
              'priority', priority,
              'category', category,
              'completed', completed
            )
          ) FILTER (WHERE due_date >= NOW()) AS upcoming_tasks
        FROM tasks
        WHERE username = $1`,
      [email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res
      .status(500)
      .json({ status: "error", msg: "Error fetching dashboard data" });
  }
};

const getAllTasksAdmin = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ status: "error", msg: "Error fetching tasks" });
  }
};

const deleteTaskAdmin = async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM tasks WHERE id = $1", [id]);
    await client.query("COMMIT");
    res.json({ status: "success", msg: "Task deleted" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting task:", error.message);
    res.status(500).json({ status: "error", msg: "Error deleting task" });
  } finally {
    client.release();
  }
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "UPDATE tasks SET completed = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [completed, id]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ status: "error", msg: "Task not found" });
    }
    await client.query("COMMIT");
    res.json({ status: "success", task: result.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating task status:", error);
    res
      .status(500)
      .json({ status: "error", msg: "Failed to update task status" });
  } finally {
    client.release();
  }
};

module.exports = {
  addNewTask,
  getAllTasks,
  updateTask,
  getPremiumFreeUsers,
  updateUserStatus,
  dashboardTasks,
  getAllTasksAdmin,
  deleteTaskAdmin,
  updateTaskStatus,
};

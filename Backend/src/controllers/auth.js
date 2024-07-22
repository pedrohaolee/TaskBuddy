const { pool } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT email, role FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error.message, error.stack);
    res.status(500).json({
      status: "error",
      msg: "Error executing query",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const hash = await bcrypt.hash(password, 12);
    await pool.query(
      "INSERT INTO users (email, hash, role) VALUES ($1, $2, $3)",
      [email, hash, role || "user"]
    );
    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ status: "error", msg: "not authorized" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.hash);
    if (!match) {
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = { email: user.email, role: user.role };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = { email: decoded.email, role: decoded.role };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refresh failed" });
  }
};

const seedUsers = async (req, res) => {
  try {
    const users = [
      { email: "admin@example.com", password: "adminpassword", role: "admin" },
      {
        email: "premium@example.com",
        password: "premiumpassword",
        role: "premium user",
      },
      {
        email: "free@example.com",
        password: "freepassword",
        role: "free user",
      },
    ];

    for (let user of users) {
      const hash = await bcrypt.hash(user.password, 12);
      await pool.query(
        "INSERT INTO users (email, hash, role) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING",
        [user.email, hash, user.role]
      );
    }

    res.json({ status: "ok", msg: "Users seeded successfully" });
  } catch (error) {
    console.error("Error seeding users:", error.message);
    res.status(500).json({ status: "error", msg: "Error seeding users" });
  }
};

module.exports = { getAllUsers, register, login, refresh, seedUsers };

// const AuthModel = require("../models/Auth");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await AuthModel.find();
//     const outputArray = [];
//     for (const user of users) {
//       outputArray.push({ email: user.email, role: user.role });
//     }
//     res.json(outputArray);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error getting users" });
//   }
// };

// const register = async (req, res) => {
//   try {
//     const auth = await AuthModel.findOne({ email: req.body.email });
//     if (auth) {
//       return res.status(400).json({ status: "error", msg: "duplicate email" });
//     }

//     const hash = await bcrypt.hash(req.body.password, 12);
//     await AuthModel.create({
//       email: req.body.email,
//       hash,
//       role: req.body.role || "user",
//     });
//     res.json({ status: "ok", msg: "user created" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "invalid registration" });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const auth = await AuthModel.findOne({ email: req.body.email });
//     if (!auth) {
//       return res.status(401).json({ status: "error", msg: "not authorized" });
//     }

//     const result = await bcrypt.compare(req.body.password, auth.hash);
//     if (!result) {
//       console.log("email or password error");
//       return res.status(401).json({ status: "error", msg: "login failed" });
//     }

//     const claims = { email: auth.email, role: auth.role };

//     const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "20m",
//       jwtid: uuidv4(),
//     });

//     const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
//       expiresIn: "30d",
//       jwtid: uuidv4(),
//     });

//     res.json({ access, refresh });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "login failed" });
//   }
// };

// const refresh = async (req, res) => {
//   try {
//     const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
//     const claims = { email: decoded.email, role: decoded.role };

//     const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "20m",
//       jwtid: uuidv4(),
//     });

//     res.json({ access });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "refresh failed" });
//   }
// };

// module.exports = { getAllUsers, register, login, refresh };

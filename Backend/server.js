require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const books = require("./src/routers/books");
const roles = require("./src/routers/roles");
const auth = require("./src/routers/auth");
const { createTaskTable } = require("./src/models/Tasks");

const { pool, connectDB } = require("./src/db/db");
const { connect } = require("mongoose");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB().then(() => {
  createTaskTable();
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", books);
app.use("/roles", roles);
app.use("/auth", auth);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

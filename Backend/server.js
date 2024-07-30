require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const tasks = require("./src/routers/tasks");
const roles = require("./src/routers/roles");
const auth = require("./src/routers/auth");
const { Tasks } = require("./src/models/Tasks");
const { pool, connectDB } = require("./src/db/db");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB().then(() => {
  Tasks();
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", tasks);
app.use("/roles", roles);
app.use("/auth", auth);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

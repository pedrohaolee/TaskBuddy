const express = require("express");
const router = express.Router();
const {
  addNewTask,
  getAllTasks,
  updateTask,
  getPremiumFreeUsers,
  updateUserStatus,
  dashboardTasks,
  getAllTasksAdmin,
  deleteTaskAdmin,
  updateTaskStatus,
} = require("../controllers/tasks");
const {
  validateIdInBody,
  validateIdInParam,
  validateAddTaskData,
  validateUpdateTaskData,
  validateUpdateTaskStatus,
} = require("../validators/tasks");
const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

// For regular users
router.put("/tasks", auth, validateAddTaskData, checkErrors, addNewTask);
router.post("/tasks", auth, getAllTasks);
router.patch(
  "/tasks/:id",
  auth,
  validateIdInParam,
  validateUpdateTaskData,
  checkErrors,
  updateTask
);
router.patch("/tasks/:id/status", auth, updateTaskStatus);
router.post("/dashboard", auth, dashboardTasks);

// For admin
router.get("/users", authAdmin, getPremiumFreeUsers);
router.patch("/users/:email/status", authAdmin, updateUserStatus);
router.get("/admin/tasks", authAdmin, getAllTasksAdmin);
router.delete(
  "/admin/tasks/:id",
  authAdmin,
  validateIdInParam,
  checkErrors,
  deleteTaskAdmin
);

module.exports = router;

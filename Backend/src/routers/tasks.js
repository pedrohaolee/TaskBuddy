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
router.get("/users", authAdmin, getPremiumFreeUsers);
router.patch("/users/:email/status", authAdmin, updateUserStatus);
router.post("/dashboard", auth, dashboardTasks);
router.get("/admin/tasks", authAdmin, getAllTasksAdmin);
router.delete(
  "/admin/tasks/:id",
  authAdmin,
  validateIdInParam,
  checkErrors,
  deleteTaskAdmin
);
router.patch("/tasks/:id/status", auth, updateTaskStatus);

module.exports = router;

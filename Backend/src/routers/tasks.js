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
const { getAllUsers } = require("../controllers/auth");

// router.get("/books/seed", authAdmin, seedBooks);
// router.get("/books", auth, getAllBooks);
// router.post("/books", auth, validateIdInBody, checkErrors, getBookById);
// router.put("/books", authAdmin, validateAddBookData, checkErrors, addNewBook);
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
// router.delete(
//   "/books/:id",
//   authAdmin,
//   validateIdInParam,
//   checkErrors,
//   deleteOneBookById
// );npm
// router.patch(
//   "/books/:id",
//   authAdmin,
//   validateIdInParam,
//   validateUpdateBookData,
//   checkErrors,
//   updateOneBook
// );

module.exports = router;

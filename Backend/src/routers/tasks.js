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
  validateAddBookData,
  validateUpdateBookData,
} = require("../validators/books");
const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");
const { getAllUsers } = require("../controllers/auth");

// router.get("/books/seed", authAdmin, seedBooks);
// router.get("/books", auth, getAllBooks);
// router.post("/books", auth, validateIdInBody, checkErrors, getBookById);
// router.put("/books", authAdmin, validateAddBookData, checkErrors, addNewBook);
router.put("/tasks", addNewTask);
router.post("/tasks", getAllTasks);
router.patch("/tasks/:id", updateTask);
router.get("/users", getPremiumFreeUsers);
router.patch("/users/:email/status", updateUserStatus);
router.post("/dashboard", dashboardTasks);
router.get("/admin/tasks", getAllTasksAdmin);
router.delete("/admin/tasks/:id", deleteTaskAdmin);
router.patch("/tasks/:id/status", updateTaskStatus);
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

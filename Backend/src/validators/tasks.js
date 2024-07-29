const { body, param } = require("express-validator");

const validateIdInBody = [body("id", "id is invalid").not().isEmpty().isInt()];

const validateIdInParam = [param("id", "id is invalid").isInt()];

const validateAddTaskData = [
  body("title", "title is required").notEmpty(),
  body("title", "must have a length between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("category", "category is required").notEmpty(),
  body("priority", "priority is required").notEmpty(),
  body("description", "description is required").notEmpty(),
  body("due_date", "due date is required").notEmpty().isDate(),
];

const validateUpdateTaskData = [
  body("title", "title is required").optional().notEmpty(),
  body("title", "must have a length between 1 and 50 characters")
    .optional()
    .isLength({
      min: 1,
      max: 50,
    }),
  body("category", "category is required").optional().notEmpty(),
  body("priority", "priority is required").optional().notEmpty(),
  body("description", "description is required").optional().notEmpty(),
  body("due_date", "due date is required").optional().notEmpty().isDate(),
];

const validateUpdateTaskStatus = [
  body("completed", "completed is required").notEmpty().isBoolean(),
];

module.exports = {
  validateIdInBody,
  validateIdInParam,
  validateAddTaskData,
  validateUpdateTaskData,
  validateUpdateTaskStatus,
};

const Books = require("../models/Books");
const BooksModel = require("../models/Books");
const { pool } = require("../db/db");

// const seedBooks = async (req, res) => {
//   try {
//     await BooksModel.deleteMany({});

//     await BooksModel.create([
//       {
//         _id: "64d0f3f75676c304033d8c89",
//         title: "Interview With a Vampire",
//         author: "Anne Rice",
//         year_published: 1976,
//       },
//       {
//         _id: "64d0f3f75676c304033d8c8a",
//         title: "IT",
//         author: "Stephen King",
//         year_published: 1986,
//       },
//       {
//         _id: "64d0f3f75676c304033d8c8b",
//         title: "The Hobbit",
//         author: "J.R.R. Tolkin",
//         year_published: 1996,
//       },
//       {
//         _id: "64d0f3f75676c304033d8c8e",
//         title: "Murder on the Orient Express",
//         author: "Agatha Christie",
//         year_published: 1934,
//       },
//       {
//         _id: "64d0f3f75676c304033d8c8c",
//         title: "Dune",
//         author: "Frank Herbert",
//         year_published: 1965,
//       },
//       {
//         _id: "64d0f3f75676c304033d8c8d",
//         title: "Gone Girl",
//         author: "Gillian Flynn",
//         year_published: 2012,
//       },
//     ]);

//     res.json({ status: "ok", msg: "seeding successful" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ status: "error", msg: "seeding error" });
//   }
// };

// const getAllBooks = async (req, res) => {
//   try {
//     const allBooks = await BooksModel.find();
//     res.json(allBooks);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error getting books" });
//   }
// };

// const getBookById = async (req, res) => {
//   try {
//     // const book = await BooksModel.findById(req.body.id);
//     const book = await BooksModel.findOne({ _id: req.body.id });
//     // const book = await BooksModel.find({});
//     res.json(book);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error getting books" });
//   }
// };

// const addNewBook = async (req, res) => {
//   try {
//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       year_pbulished: req.body.year,
//     };

//     await BooksModel.create(newBook);
//     res.json({ status: "ok", msg: "book saved" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error saving books" });
//   }
// };

const getAllTasks = async (req, res) => {
  //   const username = req.body.username;

  try {
    // const result = await pool.query("SELECT * FROM tasks WHERE username = $1", [
    //   username,
    // ]);
    const result = await pool.query("SELECT * FROM tasks");
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

  console.log("Request body:", req.body);

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

  try {
    const query = `
        INSERT INTO tasks (title, category, priority, description, due_date, username, completed, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
      `;
    await pool.query(query, [
      title,
      category,
      priority,
      description,
      due_date,
      username,
      completed,
    ]);
    res.status(201).json({ msg: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ msg: "Error creating task" });
  }
};

// const deleteOneBookById = async (req, res) => {
//   try {
//     await BooksModel.findByIdAndDelete(req.params.id);
//     res.json({ status: "ok", msg: "book deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error deleting book" });
//   }
// };

// const updateOneBook = async (req, res) => {
//   try {
//     const updateBook = {
//       title: req.body.title,
//       author: req.body.author,
//       year_published: req.body.year,
//     };
//     // const updateBook = {};
//     // if ("title" in req.body) updateBook.title = req.body.title;
//     // if ("author" in req.body) updateBook.author = req.body.author;
//     // if ("year" in req.body) updateBook.year_published = req.body.year;
//     await BooksModel.findByIdAndUpdate(req.params.id, updateBook);
//     res.json({ status: "ok", msg: "book updated" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error updating book" });
//   }
// };

module.exports = {
  addNewTask,
  getAllTasks,
};

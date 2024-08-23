const express = require("express");
const cors = require("cors");
const { getBooks, getBookById } = require("./controllers/index");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/books", (req, res) => {
  const books = getBooks();
  res.json({ books });
});

app.get("/books/details/:id", (req, res) => {
  const book = getBookById(parseInt(req.params.id));
  res.json({ book });
});

module.exports = { app };

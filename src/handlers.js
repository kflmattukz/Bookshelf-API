const { books } = require('./books');
const { nanoid } = require('nanoid');
const { type } = require('express/lib/response');

const getAllBook = (req,res) => {
  res.status(201).json(books);
}

const addBook = (req,res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.body;

  console.log(req.body);

  const id = nanoid(16);
  const finished = pageCount == readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) { return res.status(501).json({ success: false , err_msg: "name can't be empty" }) };
  if (!year) { return res.status(501).json({ success: false , err_msg: "year can't be empty" }) };
  if (!author) { return res.status(501).json({ success: false , err_msg: "author can't be empty" }) };
  if (!summary) { return res.status(501).json({ success: false , err_msg: "summary can't be empty" }) };
  if (!publisher) { return res.status(501).json({ success: false , err_msg: "publisher can't be empty" }) };
  if (!pageCount) { return res.status(501).json({ success: false , err_msg: "page count can't be empty" }) };
  if (!readPage) { return res.status(501).json({ success: false , err_msg: "read page can't be empty" }) };
  if (!reading) { return res.status(501).json({ success: false , err_msg: "reading can't be empty" }) };

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt
  }

  books.push(book);
  
  return res.status(201).json({ success: true , msg: "add book success"});
}

const updateBook = (req,res) => {
  const { 
    bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.params;

  const book = books.filter(id === bookId);
  
}

const destroyBook = (req,res) => {
  const { bookId } = req.params;
  
};
const getBookById = (req,res) => {
  const { bookId } = req.params;
  const result = books.filter(bookId === bookId);

  if (!result) return res.status(401).json({ msg_err : `Book with ${ bookId } not found` });
  
  return result;
};
const getBookByName = (req,res) => {
  const { name } = req.params;
  const result = books.filter(name === name);
  
  if (!result) return res.status(401).json({ msg_err: `Book with ${ name } not found`});
  
  return result;
};
const getBookByStatus = (req,res) => {
  const { status } = req.params;
  const result = books.filter(status === status);

  if (!result) return res.status(401).json({ msg_err: `Book with ${ status } not found`});
  
  return status;
};

module.exports = { 
  addBook, 
  getAllBook,
  updateBook,
  destroyBook,
  getBookById,
  getBookByName,
  getBookByStatus
};
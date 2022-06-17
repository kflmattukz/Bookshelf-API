const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const { books }  = JSON.parse(fs.readFileSync(path.join(__dirname, "/books.json"),"utf-8"));

const getAllBook = (req,res) => {
  res.status(201).json(books);
}

const addBook = (req,res) => {
  const {
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website
  } = req.body;

  console.log(req.body);

  const isbn = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!title)       { return res.status(501).json({ success: false , err_msg: "title can't be empty" }) };
  if (!subtitle)    { return res.status(501).json({ success: false , err_msg: "subtitle can't be empty" }) };
  if (!author)      { return res.status(501).json({ success: false , err_msg: "author can't be empty" }) };
  if (!published)   { return res.status(501).json({ success: false , err_msg: "published can't be empty" }) };
  if (!publisher)   { return res.status(501).json({ success: false , err_msg: "publisher can't be empty" }) };
  if (!pages)       { return res.status(501).json({ success: false , err_msg: "pages can't be empty" }) };
  if (!description) { return res.status(501).json({ success: false , err_msg: "description page can't be empty" }) };
  if (!website)     { return res.status(501).json({ success: false , err_msg: "website can't be empty" }) };

  const newBook = {
    isbn,
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website,
    insertedAt,
    updatedAt
  }

  console.log(books);
  books.push(newBook);

  const result = fs.writeFileSync(path.join(__dirname,"/books.json"), JSON.stringify(books,null,4));
  if (!result){
    return res.status(401).json({ msg:"something went wrong, please try again later..." });
  }
  return res.status(201).json({ success: true , msg: "add book success" , book: newBook });
}

const updateBook = (req,res) => {
  const { 
    isbn,
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website
  } = req.params;

  const book = books.filter(id === bookId);
  
}

const destroyBook = (req,res) => {
  const { bookId } = req.params;
  
};

const getBookById = (req,res) => {
  const { bookid } = req.params;
  books.map(book => { 
    if (book.isbn === bookid) {
      return res.status(201).json(book);
     }
    return res.status(401).json({ msg_err : `Book with id ${ bookid } not found` });
  });
  
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
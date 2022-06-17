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

  books.push(newBook);
  let collBook = {
    books: [...books]
  }

  try {
    fs.writeFileSync(path.join(__dirname,"/books.json"), JSON.stringify(collBook,null,4));
    return res.status(201).json({ success: true , msg: "add book success" , book: newBook });
  } catch (error) {
    return res.status(401).json({ msg:"something went wrong, please try again later..." , error});
  }
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
}

const destroyBook = (req,res) => {
  const { bookid } = req.params;
  const leftBooks = books.filter(book => {return  book.isbn !== bookid})

  let collBook = {
    books: [...leftBooks]
  }

  try {
    fs.writeFileSync(path.join(__dirname,"/books.json"), JSON.stringify(collBook,null,4));
    return res.status(201).json({ success: true , msg: "remove book success"});
  } catch (error) {
    return res.status(401).json({ msg:"something went wrong, please try again later..." , error});
  }

};

const getBookById = (req,res) => {
  const { bookid } = req.params;
  const result = books.filter(book => { return book.isbn === bookid });
  if (result.length === 0) {
    console.log('error');
    return res.status(401).json({found: false , msg_err: `Book with id: ${bookid} not found`});
  }
  res.status(200).json({found: true, data: result});
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
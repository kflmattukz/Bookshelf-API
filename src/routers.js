const express = require('express');
const router = express.Router();
const { addBook , getAllBook , updateBook , destroyBook , getBookById , getBookByName , getBookByStatus } = require('./handlers');

router.get('/' , (req,res) => { res.send('Welcome to Bookshelf API'); });

router.get('/books' , getAllBook);
router.post('/books', addBook);
router.put('/books', updateBook);
router.delete('/books', destroyBook);

router.get('/book/:id', getBookById);
router.get('/books/:name' , getBookByName);
router.get('/books/:status', getBookByStatus);

module.exports = router;
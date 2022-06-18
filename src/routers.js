const express = require('express');
const router = express.Router();
const { addBook , getAllBook , updateBook , destroyBook , getBookById , getBookByName , getBookByStatus } = require('./handlers');

router.get('/' , (req,res) => { res.send('Welcome to Bookshelf API'); });

router.get('/books' , getAllBook);
router.post('/books', addBook);
router.put('/books/:bookid', updateBook);
router.delete('/books/:bookid', destroyBook);
router.get('/books/:bookid', getBookById);

module.exports = router;
const express = require('express');
const router = express.Router();

const { verifyTokenAndAdmin } = require('../controller/verification.js');
const { verifyTokenAndAuthrization } = require('../controller/verification.js');
const { verifyToken } = require('../controller/verification.js');




const book = require("../controller/book.js")

router.post('/create/:userId', verifyTokenAndAuthrization, book.createBook)        // TEST DONE
router.get('/search', verifyToken, book.displayBookByName)                         // TEST DONE
router.put('/edit/:userId',verifyTokenAndAuthrization, book.editBook)
router.delete('/delete/:userId',verifyTokenAndAuthrization, book.deleteBook)
router.get('/', book.getAllBooks)                                                  // TEST DONE

module.exports = router; 
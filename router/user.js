const express = require('express');
const router = express.Router();
// import { Router } from 'express';
// const routes = Router()

const user = require("../controller/user.js")

const { verifyTokenAndAdmin } = require('../controller/verification.js');
const { verifyTokenAndAuthrization } = require('../controller/verification.js');
// const { verifyToken } = require('../controller/verification.js');


// router.post('/register', user.register)  =====> we made an auth router for login and register
// router.post('/login', user.login)     =====> read the above comment


router.get('/', verifyTokenAndAdmin, user.all)
router.put('/edit/:id', verifyTokenAndAuthrization, user.updateUser)
router.delete('/delete/:id', verifyTokenAndAuthrization, user.deleteUser)

module.exports = router;



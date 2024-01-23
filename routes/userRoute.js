const express = require('express')
const { getAllUsers,createUser, login} = require('../Controller/usercontroller')

//router object
const router = express.Router()

router.get('/AllUsers',getAllUsers);
router.post('/register',createUser);
router.post('/login',login);


module.exports = router
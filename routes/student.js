var express = require('express');
var router = express.Router();
const {registerStudent,loginStudent, getIn4} = require('../controller/studentController')
const {registerValidate, loginValidate} = require('../middleware/validation')


router.post('/register', registerValidate, registerStudent)
router.post('/login', loginValidate, loginStudent)
router.get('/in4/:id', getIn4)

module.exports = router;
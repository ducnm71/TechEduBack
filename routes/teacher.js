var express = require('express');
var router = express.Router();
const {registerTeacher,loginTeacher, getIn4, getMember} = require('../controller/teacherContronller')
const {registerValidate,loginValidate} = require('../middleware/validation')

router.post('/register',registerValidate,registerTeacher)
router.post('/login', loginValidate, loginTeacher)
router.get('/in4/:id', getIn4)
router.get('/member', getMember)

module.exports = router;
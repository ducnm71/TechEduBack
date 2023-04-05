var express = require('express');
var router = express.Router();
const {
    createClasses, 
    getClassesOfStudent, 
    findClass, 
    getAllClasses, 
    getClassesOfTeacher,
    uploadExercise,
    getExercise,
    getClassById,
    uploadDocument,
    getDocument,
    getMember
} = require('../controller/classController')
const {protectTeacher, protectStudent} = require('../middleware/authMiddleware')

router.get('/all', getAllClasses)
router.post('/create', createClasses)
router.get('/student/:id', getClassesOfStudent)
router.get('/find/:id', protectStudent, findClass)
router.get('/teacher/:id', getClassesOfTeacher)
router.put('/uploadExercise', uploadExercise)
router.get('/:id', getClassById)
router.get('/exercise/:id', getExercise)
router.put('/uploadDocument',uploadDocument)
router.get('/document/:id', getDocument)
router.get('/member/:id', getMember)
module.exports = router
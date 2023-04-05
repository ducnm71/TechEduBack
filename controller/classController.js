const asyncHandle = require('express-async-handler')
const classModel = require('../models/classModel')
const studentModel = require('../models/studentModel')
const teacherModel = require('../models/teacherModel')

const createClasses = asyncHandle(async(req, res) => {
    const { id, name, img, teacherId } = req.body
    const classExist = await classModel.findOne({ id })
    if (classExist) {
        res.status(400)
        throw new Error('Class has already existed!')
    }

    const newClass = await classModel.create({ id, name, img })
    if (newClass) {
        res.status(200).json(newClass)
        await teacherModel.updateOne({ _id: teacherId }, { $push: { classes: newClass._id } })
    } else {
        res.status(400)
        throw new Error('Invalid class data!')
    }
})


const getClassesOfStudent = asyncHandle(async(req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentModel.findById(studentId).populate('classes');
        const classes = student.classes;
        res.json(classes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
})

const getClassesOfTeacher = asyncHandle(async(req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await teacherModel.findById(teacherId).populate('classes');
        const classes = teacher.classes;
        res.json(classes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
})

const getAllClasses = asyncHandle(async(req, res) => {
    try {
        const classes = await classModel.find({})
        res.status(200).json(classes)
    } catch (err) {
        res.status(401)
        throw new Error('hehe')
    }
})

const findClass = asyncHandle(async(req, res) => {
    try {
        const classId = req.params.id;
        const studentId = req.body.studentId;
        const student = await studentModel.findById(studentId);
        const isMatch = student.classes.includes(classId)

        if (isMatch) {
            res.status(404).json('You have joined in this class!')
        } else {
            await studentModel.updateOne({ _id: studentId }, { $push: { classes: classId } })
        }
        res.status(200).json('hehe')
    } catch (err) {
        console.log(err);
    }
})

const uploadExercise = asyncHandle(async(req, res) => {
    const { name, link, from, to, classId } = req.body
    const checkClassId = await classModel.findOne({ id: classId })
    if (checkClassId) {
        const newExercise = await classModel.updateOne({ id: classId }, {
            $push: {
                exercise: {
                    name: name,
                    link: link,
                    from: from,
                    to: to
                }
            }
        })
        if (newExercise) {
            const result = await classModel.findOne({ id: classId })
            res.status(200).json(result.exercise)
        } else {
            res.status(401)
            throw new Error('Invalid data of exercise')
        }

    }
})

const getExercise = asyncHandle(async(req, res) => {
    const result = await classModel.find({ id: req.params.id })
    if (result) {
        res.status(200).json(result[0].exercise)
    } else {
        res.status(400)
        throw new Error('Error')
    }
})

const getClassById = asyncHandle(async(req, res) => {
    const classId = req.params.id
    const result = await classModel.find({ _id: classId })
    if (result) {
        res.status(200).json(result)
    } else {
        res.status(400)
        throw new Error('Can not find this class')
    }
})

const uploadDocument = asyncHandle(async(req, res) => {
    const { name, link, date, classId } = req.body
    const checkClassId = await classModel.findOne({ id: classId })
    if (checkClassId) {
        const newDocument = await classModel.updateOne({ id: classId }, {
            $push: {
                document: {
                    name: name,
                    link: link,
                    date: date
                }
            }
        })
        if (newDocument) {
            const result = await classModel.findOne({ id: classId })
            res.status(200).json(result.document)
        } else {
            res.status(401)
            throw new Error('Invalid data of exercise')
        }

    }
})

const getDocument = asyncHandle(async(req, res) => {
    const result = await classModel.find({ id: req.params.id })
    if (result) {
        res.status(200).json(result[0].document)
    } else {
        res.status(400)
        throw new Error('Error')
    }
})

const getMember = asyncHandle(async(req, res) => {
    const member = await classModel.findOne({ id: req.params.id }).populate("students")
    if (member) {
        res.status(200).json(member.students)
    } else {
        res.status(400)
        throw new Error('Error')
    }
})

module.exports = {
    createClasses,
    getClassesOfStudent,
    getAllClasses,
    findClass,
    getClassesOfTeacher,
    uploadExercise,
    getExercise,
    getClassById,
    uploadDocument,
    getDocument,
    getMember
}
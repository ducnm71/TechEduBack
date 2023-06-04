const asyncHandle = require('express-async-handler')
const studentModel = require('../models/studentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerStudent = asyncHandle(async(req, res) => {
    const { name, email, password} = req.body

    const studentExist = await studentModel.findOne({ email })
    if (studentExist) {
        res.status(400)
        throw new Error('Account has already existed!')
    }
    const newStudent = await studentModel.create({ name, email, password})
    if (newStudent) {
        res.status(200).json({
            _id: newStudent._id,
            name: newStudent.name,
            email: newStudent.email,
            jwt: jwt.sign({ id: newStudent._id }, 'secret', {
                expiresIn: '1d'
            })
        })
    } else {
        res.status(400)
        throw new Error('Invalid account data!')
    }
})

const loginStudent = asyncHandle(async(req, res) => {
    const { email, password } = req.body
    const student = await studentModel.findOne({ email })
    if (!student) {
        res.status(404).send("Email not found !")
        return
    }
    await bcrypt.compare(password, student.password)
        .then((result) => {
            if (!result) {
                res.status(404).send("Incorrect password !")
            }
        })

    let token = jwt.sign({ name: student.name, email: student.email, password: student.password, id: student._id }, 'secret', {
        expiresIn: '1d'
    })
    console.log(token);
    res.status(200).send({ "jwt": token, id: student._id, name: student.name, message: "Login successfully!" })
})

const getIn4 = asyncHandle(async(req,res) => {
    const id = req.params.id
    const student = await studentModel.findOne({_id: id})
    if(student){
        res.status(200).json(student)
    }else{
        res.status(400)
        throw new Error('Can not find')
    }
})

module.exports = {
    registerStudent,
    loginStudent, 
    getIn4
}
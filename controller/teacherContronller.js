const asyncHandle = require('express-async-handler')
const teacherModel = require('../models/teacherModel')
const studentModel = require('../models/studentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerTeacher = asyncHandle(async(req,res)=> {
    const {name, email, password} = req.body

    const teacherExist = await teacherModel.findOne({email})
    if(teacherExist) {
        res.status(400)
        throw new Error('Account has already existed!')
    }
    const newTeacher = await teacherModel.create({name,email,password})
    if(newTeacher) {
        res.status(200).json({
            _id: newTeacher._id,
            name: newTeacher.name,
            email: newTeacher.email,
            jwt: jwt.sign({id: newTeacher._id}, 'secret',{
                expiresIn: '1d'
            })
        })
    } else{
        res.status(400)
        throw new Error('Invalid account data!')
    }
}) 

const loginTeacher = asyncHandle(async(req,res)=> {
    const {email,password} = req.body
    const teacher = await teacherModel.findOne({email})
    if(!teacher){
        res.status(404).send("Email not found !")
        return
    }
    await bcrypt.compare(password, teacher.password)
    .then((result) => {
        if(!result){
            res.status(404).send("Incorrect password !")
        }
    })

    let token = jwt.sign({name: teacher.name, email: teacher.email, password: teacher.password, id: teacher._id}, 'secret',{
        expiresIn: '1d'
    })
    console.log(token);
    res.status(200).send({"jwt": token, id:teacher._id  ,name: teacher.name, message: "Login successfully!"})
})

const getIn4 = asyncHandle(async(req,res) => {
    const id = req.params.id
    const teacher = await teacherModel.findOne({_id: id})
    if(teacher){
        res.status(200).json(teacher)
    }else{
        res.status(400)
        throw new Error('Can not find')
    }
})

const getMember = asyncHandle(async(req, res) => {
    const member = await studentModel.find()
    if (member) {
        res.status(200).json(member)
    } else {
        res.status(400)
        throw new Error('Error')
    }
})

module.exports = {
    registerTeacher,
    loginTeacher,
    getIn4,
    getMember
}
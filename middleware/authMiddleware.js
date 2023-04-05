const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Teacher = require('../models/teacherModel')
const Student = require('../models/studentModel')

const protectTeacher = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      res.json(token)
      const decoded = jwt.verify(token, 'secret')

      const teacher = await Teacher.findById(decoded.id)
      req.body.teacherId  = teacher._id
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const protectStudent = asyncHandler(async (req, res, next) => {
  let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
  
        const decoded = jwt.verify(token, 'secret')
        
        const student = await Student.findById(decoded.id)
        req.body.studentId = student._id
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  })
  

// const isTeacher = (req, res, next) => {
//   if (req.teacher && req.teacher.isTeacher) {
//     next()
//   } else {
//     res.status(401)
//     throw new Error('Not authorized as a teacher')
//   }
// }

// const isStudent = (req, res, next) => {
//     if (req.student && req.student.isStudent) {
//       next()
//     } else {
//       res.status(401)
//       throw new Error('Not authorized as a student')
//     }
//   }

module.exports = { protectStudent, protectTeacher}

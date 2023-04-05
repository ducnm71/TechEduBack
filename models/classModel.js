const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
    name: {type:String, require: true},
    link: {type:String, require: true},
    status: {type:String, require: true, default: 'Not Scored yet'},
    from: {type: String, require: true},
    to: {type: String, require: true},
    dl: {type: String, require: true}
})

const documentSchema = mongoose.Schema({
    name: {type:String, require: true},
    link: {type:String, require: true},
    date: {type: String, require: true}
})

const classSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    exercise: [exerciseSchema],
    document: [documentSchema],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Student'
    }]
})


const Class = mongoose.model('Class', classSchema)
module.exports = Class
const mongoose = require('mongoose')


const resourcesSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }, 
    img: {
        type: String,
        require: true
    }
})

const Resources = mongoose.model('Resources', resourcesSchema)
module.exports = Resources
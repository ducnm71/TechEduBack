const asyncHandle = require('express-async-handler')
const { count } = require('../models/resourcesModel')
const resourcesModel = require('../models/resourcesModel')


const createResources = asyncHandle(async(req, res) => {
    const {name, date, link, img} = req.body

    const newResources = await resourcesModel.create({name, date, link, img})
    if(newResources){
        res.status(200).json({
            name: newResources.name,
            date: newResources.date,
            link: newResources.link,
            img: newResources.img
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid data')
    }
})

const getResources = asyncHandle(async(req, res, next) => {
    const perPage = 6 
    const page = req.params.page || 1    
    const result = await resourcesModel.find()
    .skip(perPage * (page-1))
    .limit(perPage)
    
    const count = await resourcesModel.countDocuments()
    res.json({
        result,
        current: page,
        count,
        pages: Math.ceil(count/perPage)
        })
})

module.exports = {createResources, getResources}
const Joi = require('joi')

const registerValidate = (req, res, next) => {
    const data = req.body
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        dob: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required()
    })
    const { error } = schema.validate(data)
    if (error) return res.status(400).send(error.details[0].message)
    next()

}

const loginValidate = (req, res, next) => {
    const data = req.body
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    const { error } = schema.validate(data)
    if (error) return res.status(400).send(error.details[0].message)
    next()
}

module.exports = { registerValidate, loginValidate }
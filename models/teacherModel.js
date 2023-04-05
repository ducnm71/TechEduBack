const mongoose =require('mongoose')
const bcrypt = require('bcrypt')

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
      },
    password: {
        type: String,
        required: true
    },
      dob: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    classes: [{
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Class'
    }]
})

teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (e) {
      return next(e);
    }
  });

  const Teacher = mongoose.model('Teacher', teacherSchema)
  module.exports = Teacher

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const studentRouter = require('./routes/student')
const teacherRouter = require('./routes/teacher')
const classRouter = require('./routes/class')
const resourcesRouter = require('./routes/resources')

var app = express();

app.use(cors())
const connectDB = require('./config/database')
const {errorMiddleware} = require('./middleware/errorMiddleware')


connectDB()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/student', studentRouter)
app.use('/teacher', teacherRouter)
app.use('/class', classRouter)
app.use('/resources', resourcesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

module.exports = app;

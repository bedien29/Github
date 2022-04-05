
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session =require('express-session')

const mongoose = require('mongoose');
require('./components/users/model');
require('./components/categories/model');
require('./components/products/model');

// khai bao router
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var apitRouter = require('./routes/api');
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'myKey',
  resave: true,
  saveUninitialized:true,
  cookie:{secure:false}
}))


mongoose.connect('mongodb+srv://admin:123@cluster0.gtvhv.mongodb.net/Products16302?retryWrites=true&w=majority', {  
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
.catch(err => console.log('>>>>>>>>> DB Error: ', err));



//import các router
app.use('/', indexRouter);
app.use('/san-pham',productRouter);
app.use('/api',apitRouter);
app.use('/danh-muc',categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

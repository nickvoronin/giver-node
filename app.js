var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var Logger = require('./logger');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//logger
var logger = new Logger();

//session
var session = require('express-session'); // Сессии
var MongoStore = require('connect-mongo')(session); // Хранилище сессий в монгодб

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

require('./bin/dbinit');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('./middleware/rt'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//session
app.use(session({
  secret: 'Химера Хирера',
  // Замените на что нибудь
  resave: false,
  // Пересохранять даже если нету изменений
  saveUninitialized: true,
  // Сохранять пустые сессии
  store: new MongoStore({ mongooseConnection: require('mongoose').connection })
  // Использовать монго хранилище
}));


app.use('/', index);
app.use('/users', users);

// Обработчик ошибок
app.use(require('./error/errorHandler'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

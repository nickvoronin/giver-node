/**
 * Created by palzuncoff on 5/26/17.
 */
var Logger = require('../logger');

//logger
var logger = new Logger();

var config = require('../config');

// Инициализация датабазы!
// Загрузим mongoose
var mongoose = require('mongoose');
// Заменим библиотеку Обещаний (Promise) которая идет в поставку с mongoose (mpromise)
mongoose.Promise = require('bluebird');
// На Bluebird
// Подключимся к серверу MongoDB
// В дальнейшем адрес сервера будет загружаться с конфигов
mongoose.connect(config.mongoose.uri,
  config.mongoose.options.server.poolSize);

// В случае ошибки будет вызвано данная функция
mongoose.connection.on('error',(err)=> {
  logger.error("Database Connection Error: " + err);
  // Скажите админу пусть включит MongoDB сервер :)
  logger.error('Админ сервер MongoDB Запусти!');
  process.exit(2);
});

// Данная функция будет вызвано когда подключение будет установлено
mongoose.connection.on('connected',()=> {
  // Подключение установлено
  logger.info("Succesfully connected to MongoDB Database");
  // В дальнейшем здесь мы будем запускать сервер.
});
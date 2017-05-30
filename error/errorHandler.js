/**
 * Created by palzuncoff on 5/26/17.
 */

var Logger = require('../logger');

//logger
var logger = new Logger();


module.exports = function(err,req,res,next) {
  // err всегда установлен ибо Express.js проверяет была ли передана ошибка или нет, и вызывает обработчики только если ошибка есть;
  logger.error(err);
  // В дальнейшем мы будем отправлять ошибки по почте, записывать в файл и так далее.
  res.status(503).send(err.stack || err.message);
  // Здесь можно вызвать next() или самим сообщить об ошибке клиенту.
  // В будущем можно сделать страниц 503 с ошибкой
};
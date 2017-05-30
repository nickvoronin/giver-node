/**
 * Created by palzuncoff on 5/26/17.
 */

var Logger = require('../logger');

//logger
var logger = new Logger();
//Project/bin/master.js
var cluster = require('cluster');
// Загрузим нативный модуль cluster

var CPUCount = require("os").cpus().length;
// Получим количество ядер процессора
// Создание дочернего процесса требует много ресурсов. Поэтому в связке с 8 ядерным сервером и Nodemon-ом дает адские лаги при сохранении.
// Рекомендую при активной разработке ставить CPUCount в 1 иначе вы будете страдать как я....

cluster.on('disconnect', (worker, code, signal) => {
  // В случае отключения IPC запустить нового рабочего (мы узнаем про это подробнее далее)
  logger.log(`Worker ${worker.id} died`);
// запишем в лог отключение сервера, что бы разработчики обратили внимание.
cluster.fork();
// Создадим рабочего
});

cluster.on('online', (worker) => {
  //Если рабочий соединился с нами запишем это в лог!
  logger.log(`Worker ${worker.id} running`);
});
// Создадим рабочих в количестве CPUCount
for(var i = 0; i < CPUCount; ++i) {
  cluster.fork(); // Родить рабочего! :)
}
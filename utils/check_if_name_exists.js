/**
 * Created by palzuncoff on 6/14/17.
 */

const Logger = require('../logger');
const logger = new Logger();

module.exports = function checkIfNameExists(collection, criteria, callback){
  collection.count(criteria, (error, results) => {
    if(error){
      logger.error(error);
      callback(false);
      return;
    }
    callback(results > 0);
  });
};
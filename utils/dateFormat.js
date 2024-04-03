// create a module for dateFormat function and export it
const moment = require('moment');

module.exports = function dateFormat(timestamp, format) {
     return moment(timestamp).format(format);
}
/**
 * Created by davey on 11/12/16.
 */
var moment = require('moment');

var date2 = moment().subtract(1, 'month').endOf('month').endOf('day');
console.log('date2', date2);
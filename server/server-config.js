/* 
* @Author: justinwebb
* @Date:   2015-05-27 15:34:14
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-14 15:21:16
*/

'use strict';
var path = require('path');

module.exports = {
  port: process.env.PORT,
  dist: path.resolve('dist')
};

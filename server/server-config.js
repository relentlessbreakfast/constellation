/* 
* @Author: justinwebb
* @Date:   2015-05-27 15:34:14
* @Last Modified by:   cwhwang1986
* @Last Modified time: 2015-06-15 13:51:37
*/

'use strict';
var path = require('path');

module.exports = {
  port: process.env.PORT || 3030,
  dist: path.resolve('dist')
};

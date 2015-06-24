/* 
* @Author: justinwebb
* @Date:   2015-05-27 15:34:14
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-06-23 17:20:34
*/

'use strict';
var path = require('path');
var fs = require('fs');

module.exports = {
  port: process.env.PORT || 3030,
  dist: path.resolve('dist')
};

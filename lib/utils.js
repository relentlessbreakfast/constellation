/* 
* @Author: Justin Webb
* @Date:   2015-05-29 00:19:12
* @Last Modified by:   Justin Webb
* @Last Modified time: 2015-05-29 00:20:57
*/

'use strict';
var path = require('path');

exports = module.exports;

exports.grandParentDir = function (cwd) {
  var gpd = path.parse(cwd).dir;
  gpd = gpd.substr(gpd.lastIndexOf('/') + 1, gpd.length);
  gpd = gpd.charAt(0).toUpperCase() + gpd.slice(1);
  return gpd;
};

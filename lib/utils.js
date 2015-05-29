/* 
* @Author: Justin Webb
* @Date:   2015-05-29 00:19:12
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-05-29 00:29:06
*/

'use strict';
var path = require('path');

exports = module.exports;

exports.grandParentDir = function (cwd, isName) {
  var isProperName = isName || false;
  var gpd = path.parse(cwd).dir;
  gpd = gpd.substr(gpd.lastIndexOf('/') + 1, gpd.length);
  if (isProperName) {
    gpd = gpd.charAt(0).toUpperCase() + gpd.slice(1);
  }
  return gpd;
};

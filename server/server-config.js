/* 
* @Author: justinwebb
* @Date:   2015-05-27 15:34:14
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-19 14:54:12
*/

'use strict';
var path = require('path');
var fs = require('fs');
var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

module.exports = {
  port: process.env.PORT || 3030,
  dist: path.resolve('dist'),
  ssl: {
    key: fs.readFileSync(path.join(home, process.env.SSL_DIR, 'key.pem')),
    cert: fs.readFileSync(path.join(home, process.env.SSL_DIR, 'cert.pem')),
    requestCert: false,
    rejectUnauthorized: false
  }

};

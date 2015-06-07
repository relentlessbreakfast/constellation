/*
* @Author: kuychaco
* @Date:   2015-06-01 12:36:59
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-04 20:06:35
*/

'use strict';



describe('db.spec', function () {

  var fs;
  var config;
  var dbClient;
  var user;
  
  beforeEach(function () {
    fs = require('fs');
    config = require('../../build-config');
    dbClient = require(config.db + '/db');
    user = null;

    fs.readFile(config.sampleData +'/users.js', function (err, files) {
      if (err) throw err;
      user = files;
    });
    
  });

  it('exists', function () {
    console.log('db.spec: ', user);
    expect(user).to.be.a('object');
  });
});


// describe('insert user', function() {

//   console.log(user);
//   dbClient.queryAsync()


//   it('should equal 2', function () {
//     expect(testFunc).toBe(4);
//   });

//   describe('a service', function() {

//   });

//   describe('a controller', function() {

//   });
// });

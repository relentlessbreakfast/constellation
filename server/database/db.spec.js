/*
* @Author: kuychaco
* @Date:   2015-06-01 12:36:59
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-01 17:05:11
*/

'use strict';
var config = require('../../build-config');

var user = require(config.sampleData + '/users').user;
var dbClient = require(config.db + '/db');

describe('insert user', function() {

  console.log(user);
  // dbClient.queryAsync()

  // var testFunc;
  // beforeEach(module('cd-app.login'));
  // beforeEach(inject(function (_testFunc_) {
  //   testFunc = _testFunc_;
  // }));

  // it('should equal 2', function () {
  //   expect(testFunc).toBe(4);
  // });

  // describe('a service', function() {

  // });

  // describe('a controller', function() {

  // });
});
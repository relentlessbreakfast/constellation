/* 
* @Author: justinwebb
* @Date:   2015-06-02 09:43:48
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-02 13:17:19
*/

'use strict';
var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('./server');

describe('information at root directory of server',
  function() {
  it('is connecting locally', function(done) {
  // pass in our server to supertest
  request(app)
    .get('/')
    // test passes if statusCode is 200
    .expect(200, function(err, data) {
      // display error in terminal 
      console.log('error: ', err);
      // data is everything we get back from the server
      console.log('data: ', data);
    })
    // test will timeout without end
    .end(done);
  });

});

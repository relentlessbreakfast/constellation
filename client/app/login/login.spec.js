/* 
* @Author: justinwebb
* @Date:   2015-05-28 19:47:34
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-01 16:13:02
*/

'use strict';
describe('cd-app.login', function() {
  
  var testFunc;
  beforeEach(module('cd-app.login'));
  beforeEach(inject(function (_testFunc_) {
    testFunc = _testFunc_;
  }));

  it('should equal 2', function () {
    expect(testFunc).toBe(6);
  });

  describe('a service', function() {

  });

  describe('a controller', function() {
    
  });
});

/*
* @Author: kuychaco
* @Date:   2015-06-03 11:57:45
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-09 20:20:05
*/

'use strict';

var Bluebird = require('bluebird');
var dbController = Bluebird.promisifyAll(require('../database/db-controller'));
var express = require('express');
var router = express.Router();
var data = require('../database/data-stubs');


router.get('/', function(req, res) {
  res.json({message: 'welcome to our api!'});
});


router.get('/cluster/:cluster_id', function(req, res) {
  console.log('get request for cluster', req.params.cluster_id);
  var clusterId = req.params.cluster_id;

  dbController.getGraphAsync(clusterId)
    .then(function(graph) {
      res.json(graph);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    })
    .finally(function() {
      res.end('could not find cluster');
      // TODO: Research when to close connection
      // dbController.closeConnection();
    });

});

router.post('/cluster/:cluster_id', function(req, res) {
  console.log(req.body);
  dbController.postCluster(req.body);
  res.end('cluster received');
});

router.post('/nodes', function(req, res) {
  console.log(req.body);
  dbController.postNodes(req.body);
  res.end('nodes received');
});


module.exports = router;

/*
* @Author: kuychaco
* @Date:   2015-06-03 11:57:45
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-12 23:48:50
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


router.get('/avatars', function(req, res) {
  dbController.getAvatarsAsync()
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
});

router.get('/graph/:cluster_id', function(req, res) {
  console.log('get request for graph', req.params.cluster_id);
  var clusterId = req.params.cluster_id;

  dbController.getGraphAsync(clusterId)
    .then(function(graph) {
      res.json(graph);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
    // .finally(function() {
    //   // TODO: Research when to close connection
    //   // dbController.closeConnection();
    // });

});

router.post('/graph', function(req, res) {
  console.log('post request for graph with parent cluster id', req.body.parent_cluster);

  dbController.postGraphAsync(req.body)
    .then(function(graph) {
      res.end('graph successfully saved');
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
    // .finally(function() {
    //   // TODO: Research when to close connection
    //   // dbController.closeConnection();
    // });
});


module.exports = router;

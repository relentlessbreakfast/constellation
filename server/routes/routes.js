/*
* @Author: kuychaco
* @Date:   2015-06-03 11:57:45
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-16 18:49:05
*
* ----------------------------
* Create router
* Set up routes to
*  - get users
*  - get graph
*  - post graph
* ----------------------------
*/

'use strict';

var Bluebird = require('bluebird');
var dbController = Bluebird.promisifyAll(require('../database/db-controller'));

var express = require('express');
// Create an instance of an express router
var router = express.Router();

// Route to get user info (id, handle, name, avatar_url)
router.get('api/users', function(req, res) {

  dbController.getUsersAsync()
    .then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });

});

// Route to get graph for cluster with id=cluster_id
router.get('/api/graph/:cluster_id', function(req, res) {
  console.log('get request for graph for cluster_id =', req.params.cluster_id);
  var clusterId = req.params.cluster_id;

  dbController.getGraphAsync(clusterId)
    .then(function(graph) {
      res.json(graph);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });

});

// Route to post graph upon saving
router.post('/api/graph', function(req, res) {
  console.log('post request for graph with parent cluster_id = ', req.body.parent_cluster);

  dbController.postGraphAsync(req.body)
    .then(function() {
      res.end('graph successfully saved');
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });

});

// Export to server.js
module.exports = router;

/*
* @Author: kuychaco
* @Date:   2015-06-03 11:57:45
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-08 16:43:02
*/

'use strict';

var dbController = require('../database/db');
var express = require('express');
var router = express.Router();
var data = require('../database/data-stubs');

var graph;
router.get('/', function(req, res) {
  res.json({message: 'welcome to our api!'});
});
router.get('/cluster/:cluster_id', function(req, res) {
  console.log('get request for cluster', req.params.cluster_id);

  if (req.params.cluster_id === '1') {
    return res.json(data.graph1);
  }
  else if (req.params.cluster_id === '5') {
    return res.json(data.graph2);
  }
  res.end('could not find cluster');
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

/*
* @Author: kuychaco
* @Date:   2015-06-02 15:06:02
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-02 19:08:27
*/

'use strict';


/* * * * * GRAPH CLASS * * * * */

// input is parsed graph JSON
var WrappedGraph = function(graphObj) {
  this.graph = graphObj;
};


/* * * * * GRAPH OPERATIONS * * * * */

/* * * * * Add/Remove Node * * * * */

/**
 * deleteNode
 * stores the upstream and downstream arrays from the node to be
 * deleted, unlinks that node from its upstream and downstream
 * nodes, and deletes the node from the graph object. Then, the
 * upstream and downstream nodes are linked.
 * @param  {int} nodeId [a nodeId correspond to a key in the graph object]
 * @return {undefined}  [used to mutate the graph obj; no return value.]
 */
WrappedGraph.prototype.deleteNode = function(nodeId) {
  var wrappedGraph = this;
  // store upstream and downstream arrays
  var upstream = this.graph[nodeId].upstream_nodes.slice() || [];
  var downstream = this.graph[nodeId].downstream_nodes.slice() || [];
  // break links to nodeId
  upstream.forEach(function(upNodeId) {
    wrappedGraph.unlinkNodes(upNodeId, nodeId);
  });
  downstream.forEach(function(downNodeId) {
    wrappedGraph.unlinkNodes(nodeId, downNodeId);
  });
  // remove node from graph object
  delete wrappedGraph.graph[nodeId];
  // create links between upstream and downstream nodes
  upstream.forEach(function(upNodeId) {
    downstream.forEach(function(downNodeId) {
      // linkNodes calls transitive reduction
      wrappedGraph.linkNodes(upNodeId, downNodeId);
    });
  });
};

// Note: createNode has yet to be written; waiting for node class def.

/* * * * * Add/Remove link * * * * */

/**
 * linkNodes
 * links one upstream node to a downstream node by adding each node's
 * id to the other's correspondin array.
 * @param  {int}  upNodeId  [a nodeId correspond to a key in the graph object]
 * @param  {int} downNodeId [a nodeId correspond to a key in the graph object]
 * @return {undefined}      [used to mutate the graph obj; no return value.]
 */
WrappedGraph.prototype.linkNodes = function(upNodeId, downNodeId) {
  // adds appropriate nodeIds to upstream and downstream arrays
  this.graph[upNodeId].downstream_nodes.push(downNodeId);
  this.graph[downNodeId].upstream_nodes.push(upNodeId);
  // do transitive reduction
  this.transitiveReduction(downNodeId, upNodeId);
};

/**
 * unlinkNodes
 * removes the node references linking two nodes from each node's 
 * corresponding array.
 * @param  {int} upNodeId   [upstream node's id]
 * @param  {int} downNodeId [downstream node's id]
 * @return {undefined]}     [used to mutate the graph obj; no return value.]
 */
WrappedGraph.prototype.unlinkNodes = function(upNodeId, downNodeId) {
  // remove downNodeId from upNodeId's downstream array
  this.graph[upNodeId].downstream_nodes.forEach(function(nodeId, i, arr) {
    if (nodeId === downNodeId) {
      arr.splice(i,1);
    }
  });
  // remove upNodeId from downNodeId's upstream array
  this.graph[downNodeId].upstream_nodes.forEach(function(nodeId, i, arr) {
    if (nodeId === upNodeId) {
      arr.splice(i,1);
    }
  });
};


/* * * * * Transitive Reduction * * * * * 
Given a particular node and a new dependency (new upstream node)
*/

WrappedGraph.prototype.gatherUpstreamNodeRefs = function(nodeId) {
  // catalog object w/ all upstream nodeIds as keys
  var catalog = {};
  var wrappedGraph = this;
  // recurse up to entry node and add nodeIds to catalog
  var recurse = function (nodeId) {
    wrappedGraph.graph[nodeId].upstream_nodes && wrappedGraph.graph[nodeId].upstream_nodes.forEach(function(upNodeId) {
      catalog[upNodeId] = true;
      recurse(upNodeId);
    });
  };
  recurse(nodeId);

  return catalog;
};

WrappedGraph.prototype.purgeUplinksFromANode = function(nodeId, catalogObj) {
  var wrappedGraph = this;
  // iterate through nodeIds in upstream array for node with nodeId
  this.graph[nodeId].upstream_nodes && this.graph[nodeId].upstream_nodes.forEach(function(upNodeId) {
    // if uplinkNodeId is in catalogObj
    if (catalogObj.hasOwnProperty(upNodeId)) {
      wrappedGraph.unlinkNodes(upNodeId, nodeId);
    }
  });
};

WrappedGraph.prototype.purgeUplinksBelowANode = function(nodeId, catalogObj) {
  var wrappedGraph = this;
  // iterate through nodeIds in downstream array for node with nodeId
  this.graph[nodeId].downstream_nodes && this.graph[nodeId].downstream_nodes.forEach(function(downNodeId) {
    // purgeUplinksFromANode for each nodeId in upstream array of node
    wrappedGraph.purgeUplinksFromANode(downNodeId, catalogObj);
    // recursive call for each downstream nodeId
    wrappedGraph.purgeUplinksBelowANode(downNodeId, catalogObj);
  });
};

WrappedGraph.prototype.transitiveReduction = function(nodeId, newUpNodeId) {
  // gather all upstream nodeIds
  var catalog = this.gatherUpstreamNodeRefs(newUpNodeId);
  // remove all uplinks from node at nodeId
  this.purgeUplinksFromANode(nodeId, catalog);
  // add newUpNodeId to catalog
  catalog[newUpNodeId] = true;
  // remove nodeId from all downstream nodes
  this.purgeUplinksBelowANode(nodeId, catalog);
};

/* * * * * * * * * * * * * * * * * * */
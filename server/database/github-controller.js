/*
* @Author: kuychaco
* @Date:   2015-06-10 16:19:56
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-06-13 14:14:47
*/

'use strict';

var GitHubApi = require('github');

var github = new GitHubApi({
  // required
  version: '3.0.0',
  // optional
  // debug: true,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  // pathPrefix: '/api/v3', // for some GHEs; none for GitHub
  timeout: 5000,
  headers: {
    'user-agent': 'ConstellationPM'
  }
});

github.authenticate({
  type: 'oauth',
  key: process.env.GITHUB_ID,
  secret: process.env.GITHUB_SECRET
});

// Get all issues from specified repo
var getIssues = function(callback) {

  github.issues.repoIssues({
    user: 'relentlessbreakfast',
    repo: 'WebApp',
    state: 'open'
  }, function(err, res) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, res);
  });

};

// Helper method to automate creation of issues
var createIssue = function(title, body, label) {
  github.issues.create({
    user: 'relentlessbreakfast',
    repo: 'WebApp',
    title: title,
    body: body,
    assignee: 'kuychaco',
    labels: [label]
  }, function(err, res) {
    console.log(res);
  });
};

module.exports.getIssues = getIssues;
module.exports.createIssue = createIssue;

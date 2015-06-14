/*
* @Author: kuychaco
* @Date:   2015-06-10 16:19:56
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-13 19:30:49
*
* ----------------------------
* Connect to github API
* Get issues from demo repo
* Create issues for demo
* ----------------------------
*/

'use strict';

var GitHubApi = require('github');

var github = new GitHubApi({
  version: '3.0.0',
  protocol: 'https',
  host: 'api.github.com',
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

// Helper method to automate creation of issues (one time invocation)
var createIssue = function(title, body, label) {

  github.issues.create({
    user: 'relentlessbreakfast',
    repo: 'WebApp',
    title: title,
    body: body,
    assignee: 'kuychaco',
    labels: [label]
  }, function(err, res) {
    if (err) {
      return console.error(err, null);
    }
    return console.log(null, res);
  });

};

module.exports.getIssues = getIssues;
module.exports.createIssue = createIssue;

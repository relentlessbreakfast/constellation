/*
* @Author: kuychaco
* @Date:   2015-06-10 16:19:56
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-11 00:19:39
*/

'use strict';

var GitHubApi = require("github");

var github = new GitHubApi({
  // required
  version: "3.0.0",
  // optional
  // debug: true,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub
  // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
  timeout: 5000,
  headers: {
    "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
  }
});

// OAuth2
github.authenticate({
  type: "oauth",
  token: "<INSERT_GITHUB_TOKEN_HERE>"
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

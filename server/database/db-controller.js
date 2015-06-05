/*
* @Author: kuychaco
* @Date:   2015-06-03 10:20:55
* @Last Modified by:   kuychaco
*/

'use strict';

var config = require('../../build-config');
var pg = require('pg');
// var client = require('./db').client;
var Github = require('github');
var http = require('http');

var Promise = require('bluebird');
var conString = "postgres://localhost:5432/constellation";


var client = Promise.promisifyAll(new pg.Client(conString));

// var github = new Github({
//   token: '37207c7ab48d72fa07da71d1c12d265b2049e471',
//   auth: 'oauth'
// });

// var issues = github.getIssues('kuychaco'", "'constellation');
// issues.list({}, function(err, issues) {
//   console.log(issues);
// });

// http.get('https://api.github.com/repos/relentlessbreakfast/test/issues', function(res) {
//   console.log(res);
// });
//

var issues = [{
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/8",
  "id": 81183631,
  "number": 8,
  "title": "learn bookshelf",
  "user": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database",
  "name": "create database",
  "color": "bfd4f2"
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database%20-%20define%20schema",
  "name": "create database - define schema",
  "color": "0052cc"
  }
  ],
  "state": "open",
  "locked": false,
  "assignee": {
  "login": "Berkana",
  "id": 1445825,
  "avatar_url": "https://avatars.githubusercontent.com/u/1445825?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Berkana",
  "html_url": "https://github.com/Berkana",
  "followers_url": "https://api.github.com/users/Berkana/followers",
  "following_url": "https://api.github.com/users/Berkana/following{/other_user}",
  "gists_url": "https://api.github.com/users/Berkana/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Berkana/subscriptions",
  "organizations_url": "https://api.github.com/users/Berkana/orgs",
  "repos_url": "https://api.github.com/users/Berkana/repos",
  "events_url": "https://api.github.com/users/Berkana/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Berkana/received_events",
  "type": "User",
  "site_admin": false
  },
  "milestone": {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1",
  "html_url": "https://github.com/relentlessbreakfast/test/milestones/set%20up%20database",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1/labels",
  "id": 1134851,
  "number": 1,
  "title": "set up database",
  "description": "",
  "creator": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "open_issues": 3,
  "closed_issues": 0,
  "state": "open",
  "created_at": "2015-05-26T22:15:38Z",
  "updated_at": "2015-05-27T18:23:05Z",
  "due_on": null,
  "closed_at": null
  },
  "comments": 2,
  "created_at": "2015-05-26T23:29:02Z",
  "updated_at": "2015-05-28T23:28:44Z",
  "closed_at": null,
  "body": ""
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/7",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/7/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/7/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/7/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/7",
  "id": 81181697,
  "number": 7,
  "title": "write db-config",
  "user": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database",
  "name": "create database",
  "color": "bfd4f2"
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/in%20progress",
  "name": "in progress",
  "color": "ededed"
  }
  ],
  "state": "open",
  "locked": false,
  "assignee": null,
  "milestone": null,
  "comments": 0,
  "created_at": "2015-05-26T23:22:13Z",
  "updated_at": "2015-05-26T23:33:15Z",
  "closed_at": null,
  "body": ""
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/6",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/6/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/6/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/6/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/6",
  "id": 81180654,
  "number": 6,
  "title": "learn sequelize",
  "user": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database",
  "name": "create database",
  "color": "bfd4f2"
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database%20-%20define%20schema",
  "name": "create database - define schema",
  "color": "0052cc"
  }
  ],
  "state": "open",
  "locked": false,
  "assignee": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "milestone": null,
  "comments": 0,
  "created_at": "2015-05-26T23:19:03Z",
  "updated_at": "2015-05-27T18:19:48Z",
  "closed_at": null,
  "body": ""
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/5",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/5/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/5/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/5/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/5",
  "id": 81179852,
  "number": 5,
  "title": "define schema",
  "user": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/cluster",
  "name": "cluster",
  "color": "009800"
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database",
  "name": "create database",
  "color": "bfd4f2"
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/in%20progress",
  "name": "in progress",
  "color": "ededed"
  }
  ],
  "state": "open",
  "locked": false,
  "assignee": null,
  "milestone": null,
  "comments": 0,
  "created_at": "2015-05-26T23:17:14Z",
  "updated_at": "2015-05-26T23:33:18Z",
  "closed_at": null,
  "body": ""
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/4",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/4/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/4/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/4/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/4",
  "id": 81179485,
  "number": 4,
  "title": "create database",
  "user": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/cluster",
  "name": "cluster",
  "color": "009800"
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/ready",
  "name": "ready",
  "color": "ededed"
  }
  ],
  "state": "open",
  "locked": false,
  "assignee": null,
  "milestone": null,
  "comments": 0,
  "created_at": "2015-05-26T23:16:17Z",
  "updated_at": "2015-05-26T23:33:07Z",
  "closed_at": null,
  "body": ""
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/3",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/3/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/3/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/3/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/3",
  "id": 81161716,
  "number": 3,
  "title": "Use D3 to build the cluster",
  "user": {
  "login": "cwhwang1986",
  "id": 8173733,
  "avatar_url": "https://avatars.githubusercontent.com/u/8173733?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/cwhwang1986",
  "html_url": "https://github.com/cwhwang1986",
  "followers_url": "https://api.github.com/users/cwhwang1986/followers",
  "following_url": "https://api.github.com/users/cwhwang1986/following{/other_user}",
  "gists_url": "https://api.github.com/users/cwhwang1986/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/cwhwang1986/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/cwhwang1986/subscriptions",
  "organizations_url": "https://api.github.com/users/cwhwang1986/orgs",
  "repos_url": "https://api.github.com/users/cwhwang1986/repos",
  "events_url": "https://api.github.com/users/cwhwang1986/events{/privacy}",
  "received_events_url": "https://api.github.com/users/cwhwang1986/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [ ],
  "state": "open",
  "locked": false,
  "assignee": null,
  "milestone": {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/2",
  "html_url": "https://github.com/relentlessbreakfast/test/milestones/Cluster%20Dragging%20feature",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/2/labels",
  "id": 1134853,
  "number": 2,
  "title": "Cluster Dragging feature",
  "description": "This cluster will implement the draggability of cluster on our UI ",
  "creator": {
  "login": "cwhwang1986",
  "id": 8173733,
  "avatar_url": "https://avatars.githubusercontent.com/u/8173733?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/cwhwang1986",
  "html_url": "https://github.com/cwhwang1986",
  "followers_url": "https://api.github.com/users/cwhwang1986/followers",
  "following_url": "https://api.github.com/users/cwhwang1986/following{/other_user}",
  "gists_url": "https://api.github.com/users/cwhwang1986/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/cwhwang1986/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/cwhwang1986/subscriptions",
  "organizations_url": "https://api.github.com/users/cwhwang1986/orgs",
  "repos_url": "https://api.github.com/users/cwhwang1986/repos",
  "events_url": "https://api.github.com/users/cwhwang1986/events{/privacy}",
  "received_events_url": "https://api.github.com/users/cwhwang1986/received_events",
  "type": "User",
  "site_admin": false
  },
  "open_issues": 1,
  "closed_issues": 0,
  "state": "open",
  "created_at": "2015-05-26T22:16:24Z",
  "updated_at": "2015-05-26T22:18:23Z",
  "due_on": null,
  "closed_at": null
  },
  "comments": 0,
  "created_at": "2015-05-26T22:18:02Z",
  "updated_at": "2015-05-26T22:18:23Z",
  "closed_at": null,
  "body": ""
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/2",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/2/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/2/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/2/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/2",
  "id": 81161254,
  "number": 2,
  "title": "learn sequelize",
  "user": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [ ],
  "state": "open",
  "locked": false,
  "assignee": null,
  "milestone": {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1",
  "html_url": "https://github.com/relentlessbreakfast/test/milestones/set%20up%20database",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1/labels",
  "id": 1134851,
  "number": 1,
  "title": "set up database",
  "description": "",
  "creator": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "open_issues": 3,
  "closed_issues": 0,
  "state": "open",
  "created_at": "2015-05-26T22:15:38Z",
  "updated_at": "2015-05-27T18:23:05Z",
  "due_on": null,
  "closed_at": null
  },
  "comments": 0,
  "created_at": "2015-05-26T22:16:26Z",
  "updated_at": "2015-05-26T22:17:25Z",
  "closed_at": null,
  "body": ""
  },
  {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/1",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/1/labels{/name}",
  "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/1/comments",
  "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/1/events",
  "html_url": "https://github.com/relentlessbreakfast/test/issues/1",
  "id": 81161192,
  "number": 1,
  "title": "learn mysql",
  "user": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "labels": [ ],
  "state": "open",
  "locked": false,
  "assignee": null,
  "milestone": {
  "url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1",
  "html_url": "https://github.com/relentlessbreakfast/test/milestones/set%20up%20database",
  "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1/labels",
  "id": 1134851,
  "number": 1,
  "title": "set up database",
  "description": "",
  "creator": {
  "login": "kuychaco",
  "id": 7910250,
  "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/kuychaco",
  "html_url": "https://github.com/kuychaco",
  "followers_url": "https://api.github.com/users/kuychaco/followers",
  "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
  "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
  "organizations_url": "https://api.github.com/users/kuychaco/orgs",
  "repos_url": "https://api.github.com/users/kuychaco/repos",
  "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/kuychaco/received_events",
  "type": "User",
  "site_admin": false
  },
  "open_issues": 3,
  "closed_issues": 0,
  "state": "open",
  "created_at": "2015-05-26T22:15:38Z",
  "updated_at": "2015-05-27T18:23:05Z",
  "due_on": null,
  "closed_at": null
  },
  "comments": 0,
  "created_at": "2015-05-26T22:16:01Z",
  "updated_at": "2015-05-26T22:16:01Z",
  "closed_at": null,
  "body": ""
  }];

var users = [
    {
    "login": "kuychaco",
    "id": 7910250,
    "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/kuychaco",
    "html_url": "https://github.com/kuychaco",
    "followers_url": "https://api.github.com/users/kuychaco/followers",
    "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
    "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
    "organizations_url": "https://api.github.com/users/kuychaco/orgs",
    "repos_url": "https://api.github.com/users/kuychaco/repos",
    "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
    "received_events_url": "https://api.github.com/users/kuychaco/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Katrina Uychaco",
    "company": "",
    "blog": "",
    "location": "",
    "email": "kuychaco@gmail.com",
    "hireable": false,
    "bio": null,
    "public_repos": 43,
    "public_gists": 0,
    "followers": 25,
    "following": 1,
    "created_at": "2014-06-17T07:30:41Z",
    "updated_at": "2015-05-30T04:48:50Z"
    },
    {
    "login": "Berkana",
    "id": 1445825,
    "avatar_url": "https://avatars.githubusercontent.com/u/1445825?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Berkana",
    "html_url": "https://github.com/Berkana",
    "followers_url": "https://api.github.com/users/Berkana/followers",
    "following_url": "https://api.github.com/users/Berkana/following{/other_user}",
    "gists_url": "https://api.github.com/users/Berkana/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Berkana/subscriptions",
    "organizations_url": "https://api.github.com/users/Berkana/orgs",
    "repos_url": "https://api.github.com/users/Berkana/repos",
    "events_url": "https://api.github.com/users/Berkana/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Berkana/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Austin Liu",
    "company": "",
    "blog": "",
    "location": "United States",
    "email": "berkamin@gmail.com",
    "hireable": false,
    "bio": null,
    "public_repos": 10,
    "public_gists": 0,
    "followers": 27,
    "following": 1,
    "created_at": "2012-02-17T07:40:44Z",
    "updated_at": "2015-05-11T16:45:12Z"
    },
    {
    "login": "JustinWebb",
    "id": 442978,
    "avatar_url": "https://avatars.githubusercontent.com/u/442978?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/JustinWebb",
    "html_url": "https://github.com/JustinWebb",
    "followers_url": "https://api.github.com/users/JustinWebb/followers",
    "following_url": "https://api.github.com/users/JustinWebb/following{/other_user}",
    "gists_url": "https://api.github.com/users/JustinWebb/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/JustinWebb/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/JustinWebb/subscriptions",
    "organizations_url": "https://api.github.com/users/JustinWebb/orgs",
    "repos_url": "https://api.github.com/users/JustinWebb/repos",
    "events_url": "https://api.github.com/users/JustinWebb/events{/privacy}",
    "received_events_url": "https://api.github.com/users/JustinWebb/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Justin Webb",
    "company": "",
    "blog": "",
    "location": "",
    "email": "jw@justinwebb.io",
    "hireable": false,
    "bio": null,
    "public_repos": 6,
    "public_gists": 0,
    "followers": 34,
    "following": 16,
    "created_at": "2010-10-17T18:31:39Z",
    "updated_at": "2015-05-12T01:54:59Z"
    },
    {
    "login": "cwhwang1986",
    "id": 8173733,
    "avatar_url": "https://avatars.githubusercontent.com/u/8173733?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/cwhwang1986",
    "html_url": "https://github.com/cwhwang1986",
    "followers_url": "https://api.github.com/users/cwhwang1986/followers",
    "following_url": "https://api.github.com/users/cwhwang1986/following{/other_user}",
    "gists_url": "https://api.github.com/users/cwhwang1986/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/cwhwang1986/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/cwhwang1986/subscriptions",
    "organizations_url": "https://api.github.com/users/cwhwang1986/orgs",
    "repos_url": "https://api.github.com/users/cwhwang1986/repos",
    "events_url": "https://api.github.com/users/cwhwang1986/events{/privacy}",
    "received_events_url": "https://api.github.com/users/cwhwang1986/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Charlie Hwang",
    "company": "",
    "blog": "",
    "location": "",
    "email": "cwhwang1986@gmail.com",
    "hireable": false,
    "bio": null,
    "public_repos": 9,
    "public_gists": 0,
    "followers": 23,
    "following": 2,
    "created_at": "2014-07-15T21:30:16Z",
    "updated_at": "2015-05-29T18:55:17Z"
    }];

var labels = [{
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/bug',
  'name': 'bug',
  'color': 'fc2929'
  },
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/duplicate',
  'name': 'duplicate',
  'color': 'cccccc'
  },
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/enhancement',
  'name': 'enhancement',
  'color': '84b6eb'
  },
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/help%20wanted',
  'name': 'help wanted',
  'color': '159818'
  },
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/invalid',
  'name': 'invalid',
  'color': 'e6e6e6'
  },
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/question',
  'name': 'question',
  'color': 'cc317c'
  },
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/wontfix',
  'name': 'wontfix',
  'color': 'ffffff'
  }];

var postNodes = function(nodes) {

  // client.connectAsync()
  //   .then(function() {
  //     var query = 'INSERT INTO nodes (DEFAULT)';
  //     return client.queryAsync();
  //   });

};

var postIssues = function(/*issues*/) {
  var issue = {
    "url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8",
    "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8/labels{/name}",
    "comments_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8/comments",
    "events_url": "https://api.github.com/repos/relentlessbreakfast/test/issues/8/events",
    "html_url": "https://github.com/relentlessbreakfast/test/issues/8",
    "id": 81183631,
    "number": 8,
    "title": "learn bookshelf",
    "user": {
    "login": "kuychaco",
    "id": 7910250,
    "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/kuychaco",
    "html_url": "https://github.com/kuychaco",
    "followers_url": "https://api.github.com/users/kuychaco/followers",
    "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
    "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
    "organizations_url": "https://api.github.com/users/kuychaco/orgs",
    "repos_url": "https://api.github.com/users/kuychaco/repos",
    "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
    "received_events_url": "https://api.github.com/users/kuychaco/received_events",
    "type": "User",
    "site_admin": false
    },
    "labels": [
    {
    "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database",
    "name": "create database",
    "color": "bfd4f2"
    },
    {
    "url": "https://api.github.com/repos/relentlessbreakfast/test/labels/create%20database%20-%20define%20schema",
    "name": "create database - define schema",
    "color": "0052cc"
    }
    ],
    "state": "open",
    "locked": false,
    "assignee": {
    "login": "Berkana",
    "id": 1445825,
    "avatar_url": "https://avatars.githubusercontent.com/u/1445825?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Berkana",
    "html_url": "https://github.com/Berkana",
    "followers_url": "https://api.github.com/users/Berkana/followers",
    "following_url": "https://api.github.com/users/Berkana/following{/other_user}",
    "gists_url": "https://api.github.com/users/Berkana/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Berkana/subscriptions",
    "organizations_url": "https://api.github.com/users/Berkana/orgs",
    "repos_url": "https://api.github.com/users/Berkana/repos",
    "events_url": "https://api.github.com/users/Berkana/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Berkana/received_events",
    "type": "User",
    "site_admin": false
    },
    "milestone": {
    "url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1",
    "html_url": "https://github.com/relentlessbreakfast/test/milestones/set%20up%20database",
    "labels_url": "https://api.github.com/repos/relentlessbreakfast/test/milestones/1/labels",
    "id": 1134851,
    "number": 1,
    "title": "set up database",
    "description": "",
    "creator": {
    "login": "kuychaco",
    "id": 7910250,
    "avatar_url": "https://avatars.githubusercontent.com/u/7910250?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/kuychaco",
    "html_url": "https://github.com/kuychaco",
    "followers_url": "https://api.github.com/users/kuychaco/followers",
    "following_url": "https://api.github.com/users/kuychaco/following{/other_user}",
    "gists_url": "https://api.github.com/users/kuychaco/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/kuychaco/subscriptions",
    "organizations_url": "https://api.github.com/users/kuychaco/orgs",
    "repos_url": "https://api.github.com/users/kuychaco/repos",
    "events_url": "https://api.github.com/users/kuychaco/events{/privacy}",
    "received_events_url": "https://api.github.com/users/kuychaco/received_events",
    "type": "User",
    "site_admin": false
    },
    "open_issues": 3,
    "closed_issues": 0,
    "state": "open",
    "created_at": "2015-05-26T22:15:38Z",
    "updated_at": "2015-05-27T18:23:05Z",
    "due_on": null,
    "closed_at": null
    },
    "comments": 2,
    "created_at": "2015-05-26T23:29:02Z",
    "updated_at": "2015-05-28T23:28:44Z",
    "closed_at": null,
    "body": ""
    };

  // client.connectAsync()
  //   .then(function() {
  //     var query = 'INSERT INTO nodes (DEFAULT)';
  //     return client.queryAsync();
  //   });

};

var postUsers = function(/*users*/) {

  client.connectAsync()
    .then(function() {
      var query = 'INSERT INTO users (id, login, avatar_url, url, html_url, organizations_url, repos_url, name, email, created_at, updated_at) VALUES ';
      users.forEach(function(user, i) {
        query += "(" + user.id + ", '" + user.login + "', '" + user.avatar_url + "', '" + user.url + "', '" + user.html_url + "', '" + user.organizations_url + "', '" + user.repos_url + "', '" + user.name + "', '" + user.email + "', '" + user.created_at + "', '" + user.updated_at + "')";
        if (i !== users.length-1) {
          query += ", ";
        } else {
          query += ";";
        }
      });

      // console.log(query);

      return client.queryAsync(query).thenReturn(query);
    })
    .then(function(query) {
      console.log('successfully ran query to add users');
    })
    .catch(function(err) {
      console.error(err.message);
    })
    .finally(function() {
      client.endAsync();
    });
};
// setTimeout(postUsers, 2000);


var postLabels = function(/*labels*/) {


  client.connectAsync()
    .then(function() {
      var query = 'INSERT INTO labels (id, url, name, color) VALUES ';
      labels.forEach(function(label, i) {
        query += "(DEFAULT, '" + label.url + "', '" + label.name + "', '" + label.color + "')";
        if (i !== labels.length-1) {
          query += ", ";
        } else {
          query += ";";
        }
      });

      console.log(query);

      return client.queryAsync(query).thenReturn(query);
    })
    .then(function(query) {
      console.log('successfully ran query to add users');
    })
    .catch(function(err) {
      console.error(err.message);
    })
    .finally(function() {
      client.endAsync();
    });
};
setTimeout(postLabels, 2000);


module.exports.postNodes = postNodes;


// CREATE TABLE IF NOT EXISTS nodes (
//   id serial, -- 1, // PRIMARY KEY
//   type text, -- "cluster",
//   parent_cluster integer, -- NULL, // foreign key ID from NODES table
//   cluster_id integer REFERENCES clusters (id), -- 1, // foreign key ID from CLUSTERS table
//   issue_id integer REFERENCES issues (id), -- NULL, // foreign key ID from ISSUES table
//   upstream_nodes integer, -- [], // foreign key ID from NODES table
//   downstream_nodes integer, -- [], // foreign key ID from NODES table
//   -- all_upstream json, -- {}
//   -- all_upstream hstore, -- {}
//   PRIMARY KEY (id)
// );

// {
//   "id": 1,
//   "type": "cluster",
//   "parent_cluster": null,
//   "cluster_id": 1,
//   "issue_id": null,
//   "upstream_nodes": [],
//   "downstream_nodes": []
// }
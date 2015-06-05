/* 
* @Author: kuychaco
* @Date:   2015-05-29 22:37:34
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-05 10:26:04
*/

'use strict';


// NOTE: there are 4 types of nodes
var nodes = [
  {
    "id": 1,
    "type": "cluster",
    "parent_cluster": null,
    "cluster_id": 1,
    "issue_id": null,
    "upstream_nodes": [],
    "downstream_nodes": []
  },
  {
    "id": 2,
    "type": "entry",
    "parent_cluster": 1,
    "cluster_id": null,
    "issue_id": null,
    "upstream_nodes": null,
    "downstream_nodes": [4,6]
  },
  {
    "id": 3,
    "type": "exit",
    "parent_cluster": 1,
    "cluster_id": null,
    "issue_id": null,
    "upstream_nodes": [5,7],
    "downstream_nodes": []
  },
  {
    "id": 4,
    "type": "issue",
    "parent_cluster": 1,
    "cluster_id": null,
    "issue_id": 82639324,
    "upstream_nodes": [2],
    "downstream_nodes": [5,7]
  },
  {
    "id": 5,
    "type": "cluster",
    "parent_cluster": 1,
    "cluster_id": 3,
    "issue_id": null,
    "upstream_nodes": [4,6],
    "downstream_nodes": [3]
  },
  {
    "id": 6,
    "type": "cluster",
    "parent_cluster": 1,
    "cluster_id": 2,
    "issue_id": null,
    "upstream_nodes": [2],
    "downstream_nodes": [5,7]
  },
  {
    "id": 7,
    "type": "issue",
    "parent_cluster": 1,
    "cluster_id": null,
    "issue_id": 82639733,
    "upstream_nodes": [4,6],
    "downstream_nodes": [3]
  }
];

var issues = [
  {
  "url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7",
  "labels_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}",
  "comments_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments",
  "events_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events",
  "html_url: "https://github.com/relentlessbreakfast/sampleGraph/issues/7",
  "id: 82639733,// PRIMARY KEY
  "number: 7,
  "title: "Make sample graph data",
  "user: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "labels: [
    {
    url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/question",
    name: "question",
    color: "cc317c"
    }
  ],
  "state: "open",
  "locked: false,
  "assignee: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "milestone: null,
  "comments: 2,
  "created_at: "2015-05-30T00:18:26Z",
  "updated_at: "2015-05-30T00:43:54Z",
  "closed_at: null,
  "body: "type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data"
  },
  {
    url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4",
    labels_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}",
    comments_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments",
    events_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events",
    html_url: "https://github.com/relentlessbreakfast/sampleGraph/issues/4",
    id: 82639324,// PRIMARY KEY
    number: 4,
    title: "Add O-auth",
    user: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "labels: [
    {
    url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/bug",
    name: "bug",
    color: "fc2929"
    }
  ],
  "state: "open",
  "locked: false,
  "assignee: {
    login: "JustinWebb",
    id: 442978,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/442978?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/JustinWebb",
    html_url: "https://github.com/JustinWebb",
    followers_url: "https://api.github.com/users/JustinWebb/followers",
    following_url: "https://api.github.com/users/JustinWebb/following{/other_user}",
    gists_url: "https://api.github.com/users/JustinWebb/gists{/gist_id}",
    starred_url: "https://api.github.com/users/JustinWebb/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/JustinWebb/subscriptions",
    organizations_url: "https://api.github.com/users/JustinWebb/orgs",
    repos_url: "https://api.github.com/users/JustinWebb/repos",
    events_url: "https://api.github.com/users/JustinWebb/events{/privacy}",
    received_events_url: "https://api.github.com/users/JustinWebb/received_events",
    type: "User",
    site_admin: false
  },
  "milestone: null,
  "comments: 0,
  "created_at: "2015-05-30T00:16:35Z",
  "updated_at: "2015-05-30T00:44:37Z",
  "closed_at: null,
  "body: "Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data"
  },
  {
  "url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6",
  "labels_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6/labels{/name}",
  "comments_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6/comments",
  "events_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6/events",
  "html_url: "https://github.com/relentlessbreakfast/sampleGraph/issues/6",
  "id: 82639698,// PRIMARY KEY
  "number: 6,
  "title: "Cluster-Database Schema",
  "user: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "labels: [
    {
    url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/help%20wanted",
    name: "help wanted",
    color: "159818"
    },
    {
    url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/question",
    name: "question",
    color: "cc317c"
    }
  ],
  "state: "open",
  "locked: false,
  "assignee: {
    login: "kuychaco",
    id: 7910250,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/7910250?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/kuychaco",
    html_url: "https://github.com/kuychaco",
    followers_url: "https://api.github.com/users/kuychaco/followers",
    following_url: "https://api.github.com/users/kuychaco/following{/other_user}",
    gists_url: "https://api.github.com/users/kuychaco/gists{/gist_id}",
    starred_url: "https://api.github.com/users/kuychaco/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/kuychaco/subscriptions",
    organizations_url: "https://api.github.com/users/kuychaco/orgs",
    repos_url: "https://api.github.com/users/kuychaco/repos",
    events_url: "https://api.github.com/users/kuychaco/events{/privacy}",
    received_events_url: "https://api.github.com/users/kuychaco/received_events",
    type: "User",
    site_admin: false
  },
  "milestone: null,
  "comments: 0,
  "created_at: "2015-05-30T00:18:05Z",
  "updated_at: "2015-05-30T00:44:12Z",
  "closed_at: null,
  "body: "Type: \ * cluster\ \ Upstream: \ * entry\ \ Downstream: \ * Cluster-Repo Selection Screen\ * Make sample graph data"
  },
  {
  "url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5",
  "labels_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5/labels{/name}",
  "comments_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5/comments",
  "events_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5/events",
  "html_url: "https://github.com/relentlessbreakfast/sampleGraph/issues/5",
  "id: 82639570,// PRIMARY KEY
  "number: 5,
  "title: "Cluster-Repo Selection Screen",
  "user: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "labels: [
    {
    url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/enhancement",
    name: "enhancement",
    color: "84b6eb"
    }
  ],
  "state: "open",
  "locked: false,
    assignee: {
    login: "cwhwang1986",
    id: 8173733,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/8173733?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/cwhwang1986",
    html_url: "https://github.com/cwhwang1986",
    followers_url: "https://api.github.com/users/cwhwang1986/followers",
    following_url: "https://api.github.com/users/cwhwang1986/following{/other_user}",
    gists_url: "https://api.github.com/users/cwhwang1986/gists{/gist_id}",
    starred_url: "https://api.github.com/users/cwhwang1986/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/cwhwang1986/subscriptions",
    organizations_url: "https://api.github.com/users/cwhwang1986/orgs",
    repos_url: "https://api.github.com/users/cwhwang1986/repos",
    events_url: "https://api.github.com/users/cwhwang1986/events{/privacy}",
    received_events_url: "https://api.github.com/users/cwhwang1986/received_events",
    type: "User",
    site_admin: false
  },
  "milestone: null,
  "comments: 0,
  "created_at: "2015-05-30T00:17:36Z",
  "updated_at: "2015-05-30T00:44:24Z",
  "closed_at: null,
  "body: "type: \ * Cluster\ \ Upstream:\ * Cluster-Database Schema\ * Add O-auth\ \ Downstream:\ * exit"
  },
  {
  "url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/3",
  "labels_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/3/labels{/name}",
  "comments_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/3/comments",
  "events_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/3/events",
  "html_url: "https://github.com/relentlessbreakfast/sampleGraph/issues/3",
  "id: 82639193,// PRIMARY KEY
  "number: 3,
  "title: "exit",
  "user: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "labels: [ ],
  "state: "open",
  "locked: false,
  "assignee: null,
  "milestone: null,
  "comments: 0,
  "created_at: "2015-05-30T00:16:08Z",
  "updated_at: "2015-05-30T00:36:48Z",
  "closed_at: null,
  "body: "type:\ * exit\ \ upstream:\ * Make sample graph data\ * Cluster-Repo Selection Screen\ \ downstream: \ * null"
  },
  {
  "url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/2",
  "labels_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/2/labels{/name}",
  "comments_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/2/comments",
  "events_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/2/events",
  "html_url: "https://github.com/relentlessbreakfast/sampleGraph/issues/2",
  "id: 82639156,// PRIMARY KEY
  "number: 2,
  "title: "entry",
  "user: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "labels: [ ],
  "state: "open",
  "locked: false,
  "assignee: null,
  "milestone: null,
  "comments: 0,
  "created_at: "2015-05-30T00:15:57Z",
  "updated_at: "2015-05-30T00:35:36Z",
  "closed_at: null,
  "body: "type:\ * entry\ \ Upstream: \ * null\ \ Downstream: \ * Cluster-Database Schema\ * Add O-auth"
  },
  {
  "url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/1",
  "labels_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/1/labels{/name}",
  "comments_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/1/comments",
  "events_url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/1/events",
  "html_url: "https://github.com/relentlessbreakfast/sampleGraph/pull/1",
  "id: 82623973,// PRIMARY KEY
  "number: 1,
  "title: "(doc) Is a sample of graph data with six nodes.",
  "user: {
    login: "Berkana",
    id: 1445825,// PRIMARY KEY
    avatar_url: "https://avatars.githubusercontent.com/u/1445825?v=3",
    gravatar_id: "",
    url: "https://api.github.com/users/Berkana",
    html_url: "https://github.com/Berkana",
    followers_url: "https://api.github.com/users/Berkana/followers",
    following_url: "https://api.github.com/users/Berkana/following{/other_user}",
    gists_url: "https://api.github.com/users/Berkana/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Berkana/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Berkana/subscriptions",
    organizations_url: "https://api.github.com/users/Berkana/orgs",
    repos_url: "https://api.github.com/users/Berkana/repos",
    events_url: "https://api.github.com/users/Berkana/events{/privacy}",
    received_events_url: "https://api.github.com/users/Berkana/received_events",
    type: "User",
    site_admin: false
  },
  "labels: [ ],
  "state: "open",
  "locked: false,
  "assignee: null,
  "milestone: null,
  "comments: 0,
  "created_at: "2015-05-29T23:15:28Z",
  "updated_at: "2015-05-29T23:15:28Z",
  "closed_at: null,
  "pull_request: {
    url: "https://api.github.com/repos/relentlessbreakfast/sampleGraph/pulls/1",
    html_url: "https://github.com/relentlessbreakfast/sampleGraph/pull/1",
    diff_url: "https://github.com/relentlessbreakfast/sampleGraph/pull/1.diff",
    patch_url: "https://github.com/relentlessbreakfast/sampleGraph/pull/1.patch"
  },
  "body: "May need revision; did not have access to prior example data, so structure was reproduced from memory."
  }
];
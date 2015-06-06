/* 
* @Author: kuychaco
* @Date:   2015-05-29 22:08:30
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-05 10:21:34
*/

'use strict';

// DATABASE SCHEMA
var cluster_root = {
  'id': 1,  // PRIMARY KEY
  'abbrev': 'ROOT',  // must be less than 32 chars
  'name': 'Project Root',
  'description': 'Cluster of entire project',
  'endpoints': [2, 3],  // these foreign key IDs for entries in NODES table
  'creator': 1445825  // foreign key ID for entry in USERS table
};

var clusters = [
  {
    'id': 1,  // PRIMARY KEY
    'abbrev': 'ROOT',  // must be less than 32 chars
    'name': 'Project Root',
    'description': 'Cluster of entire project',
    'endpoints': [2, 3],  // these foreign key IDs for entries in NODES table
    'creator': 1445825  // foreign key ID for entry in USERS table
    },
  {
    'id': 2,  // PRIMARY KEY
    'abbrev': 'DB',  // must be less than 32 chars
    'name': 'Cluster-Database Schema',
    'description': 'Cluster of database schema related tasks',
    'endpoints': [11, 12],  // these foreign key IDs for entries in NODES table
    'creator': 1445825  // foreign key ID for entry in USERS table
    },
  {
    'id': 3,  // PRIMARY KEY
    'abbrev': 'Repo selection',  // must be less than 32 chars
    'name': 'Cluster-Repo Selection Screen',
    'description': 'Cluster of repo selection related tasks',
    'endpoints': [13, 14],  // these foreign key IDs for entries in NODES table
    'creator': 1445825  // foreign key ID for entry in USERS table
    }
];


// Reference: github issues that are supposed to represent clusters
var github_issues = [
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6',
  'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6/labels{/name}',
  'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6/comments',
  'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/6/events',
  'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/6',
  'id': 82639698,
  'number': 6,
  'title': 'Cluster-Database Schema',
  'user': {
    'login': 'Berkana',
    'id': 1445825,
    'avatar_url': 'https://avatars.githubusercontent.com/u/1445825?v=3',
    'gravatar_id': ',
    'url': 'https://api.github.com/users/Berkana',
    'html_url': 'https://github.com/Berkana',
    'followers_url': 'https://api.github.com/users/Berkana/followers',
    'following_url': 'https://api.github.com/users/Berkana/following{/other_user}',
    'gists_url': 'https://api.github.com/users/Berkana/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/Berkana/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/Berkana/subscriptions',
    'organizations_url': 'https://api.github.com/users/Berkana/orgs',
    'repos_url': 'https://api.github.com/users/Berkana/repos',
    'events_url': 'https://api.github.com/users/Berkana/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/Berkana/received_events',
    'type': 'User',
    'site_admin': false
  },
  'labels': [
    {
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/help%20wanted',
    'name': 'help wanted',
    'color': '159818'
    },
    {
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/question',
    'name': 'question',
    'color': 'cc317c'
    }
  ],
  'state': 'open',
  'locked': false,
  'assignee': {
    'login': 'kuychaco',
    'id': 7910250,
    'avatar_url': 'https://avatars.githubusercontent.com/u/7910250?v=3',
    'gravatar_id': ',
    'url': 'https://api.github.com/users/kuychaco',
    'html_url': 'https://github.com/kuychaco',
    'followers_url': 'https://api.github.com/users/kuychaco/followers',
    'following_url': 'https://api.github.com/users/kuychaco/following{/other_user}',
    'gists_url': 'https://api.github.com/users/kuychaco/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/kuychaco/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/kuychaco/subscriptions',
    'organizations_url': 'https://api.github.com/users/kuychaco/orgs',
    'repos_url': 'https://api.github.com/users/kuychaco/repos',
    'events_url': 'https://api.github.com/users/kuychaco/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/kuychaco/received_events',
    'type': 'User',
    'site_admin': false
  },
  'milestone': null,
  'comments': 0,
  'created_at': '2015-05-30T00:18:05Z',
  'updated_at': '2015-05-30T00:44:12Z',
  'closed_at': null,
  'body': 'Type: \ * cluster\ \ Upstream: \ * entry\ \ Downstream: \ * Cluster-Repo Selection Screen\ * Make sample graph data'
  },
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5',
  'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5/labels{/name}',
  'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5/comments',
  'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/5/events',
  'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/5',
  'id': 82639570,
  'number': 5,
  'title': 'Cluster-Repo Selection Screen',
  'user': {
    'login': 'Berkana',
    'id': 1445825,
    'avatar_url': 'https://avatars.githubusercontent.com/u/1445825?v=3',
    'gravatar_id': ',
    'url': 'https://api.github.com/users/Berkana',
    'html_url': 'https://github.com/Berkana',
    'followers_url': 'https://api.github.com/users/Berkana/followers',
    'following_url': 'https://api.github.com/users/Berkana/following{/other_user}',
    'gists_url': 'https://api.github.com/users/Berkana/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/Berkana/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/Berkana/subscriptions',
    'organizations_url': 'https://api.github.com/users/Berkana/orgs',
    'repos_url': 'https://api.github.com/users/Berkana/repos',
    'events_url': 'https://api.github.com/users/Berkana/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/Berkana/received_events',
    'type': 'User',
    'site_admin': false
  },
  'labels': [
    {
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/enhancement',
    'name': 'enhancement',
    'color': '84b6eb'
    }
  ],
  'state': 'open',
  'locked': false,
    'assignee': {
    'login': 'cwhwang1986',
    'id': 8173733,
    'avatar_url': 'https://avatars.githubusercontent.com/u/8173733?v=3',
    'gravatar_id': ',
    'url': 'https://api.github.com/users/cwhwang1986',
    'html_url': 'https://github.com/cwhwang1986',
    'followers_url': 'https://api.github.com/users/cwhwang1986/followers',
    'following_url': 'https://api.github.com/users/cwhwang1986/following{/other_user}',
    'gists_url': 'https://api.github.com/users/cwhwang1986/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/cwhwang1986/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/cwhwang1986/subscriptions',
    'organizations_url': 'https://api.github.com/users/cwhwang1986/orgs',
    'repos_url': 'https://api.github.com/users/cwhwang1986/repos',
    'events_url': 'https://api.github.com/users/cwhwang1986/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/cwhwang1986/received_events',
    'type': 'User',
    'site_admin': false
  },
  'milestone': null,
  'comments': 0,
  'created_at': '2015-05-30T00:17:36Z',
  'updated_at': '2015-05-30T00:44:24Z',
  'closed_at': null,
  'body': 'type: \ * Cluster\ \ Upstream:\ * Cluster-Database Schema\ * Add O-auth\ \ Downstream:\ * exit'
  }
];
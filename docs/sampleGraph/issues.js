/* 
* @Author: kuychaco
* @Date:   2015-05-29 21:57:53
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-05 10:24:46
*/

'use strict';

// DATABASE SCHEMA
var issue =   {
  'id': 82639733, // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
  'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
  'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
  'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
  'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
  'number': 7,
  'title': 'Make sample graph data',
  'user': 1445825,
  'labels': [6],
  'state': 'open',
  'locked': false,
  'assignee': 1445825,
  'comments': 2,
  'created_at': '2015-05-30T00:18:26Z',
  'updated_at': '2015-05-30T00:43:54Z',
  'closed_at': null,
  'body': 'type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
};

var issues = [
  {
    'id': 82639733, // PRIMARY KEY
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
    'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
    'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
    'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
    'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
    'number': 7,
    'title': 'Make sample graph data',
    'user': 1445825,
    'labels': [6],
    'state': 'open',
    'locked': false,
    'assignee': 1445825,
    'comments': 2,
    'created_at': '2015-05-30T00:18:26Z',
    'updated_at': '2015-05-30T00:43:54Z',
    'closed_at': null,
    'body': 'type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
  },
  {
    'id': 82639324,
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4',
    'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}',
    'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments',
    'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events',
    'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/4',
    'number': 4,
    'title': 'Add O-auth',
    'user': 1445825,
    'labels': [1],
    'state': 'open',
    'locked': false,
    'assignee': 442978,
    'comments': 0,
    'created_at': '2015-05-30T00:16:35Z',
    'updated_at': '2015-05-30T00:44:37Z',
    'closed_at': null,
    'body': 'Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
  }
];



// GITHUB JSON
var issues = [
  {
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7',
  'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}',
  'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments',
  'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events',
  'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/7',
  'id': 82639733,
  'number': 7,
  'title': 'Make sample graph data',
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
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/question',
    'name': 'question',
    'color': 'cc317c'
    }
  ],
  'state': 'open',
  'locked': false,
  'assignee': {
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
  'milestone': null,
  'comments': 2,
  'created_at': '2015-05-30T00:18:26Z',
  'updated_at': '2015-05-30T00:43:54Z',
  'closed_at': null,
  'body': 'type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
  },
  {
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4',
    'labels_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/labels{/name}',
    'comments_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/comments',
    'events_url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/4/events',
    'html_url': 'https://github.com/relentlessbreakfast/sampleGraph/issues/4',
    'id': 82639324,
    'number': 4,
    'title': 'Add O-auth',
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
    'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/bug',
    'name': 'bug',
    'color': 'fc2929'
    }
  ],
  'state': 'open',
  'locked': false,
  'assignee': {
    'login': 'JustinWebb',
    'id': 442978,
    'avatar_url': 'https://avatars.githubusercontent.com/u/442978?v=3',
    'gravatar_id': ',
    'url': 'https://api.github.com/users/JustinWebb',
    'html_url': 'https://github.com/JustinWebb',
    'followers_url': 'https://api.github.com/users/JustinWebb/followers',
    'following_url': 'https://api.github.com/users/JustinWebb/following{/other_user}',
    'gists_url': 'https://api.github.com/users/JustinWebb/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/JustinWebb/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/JustinWebb/subscriptions',
    'organizations_url': 'https://api.github.com/users/JustinWebb/orgs',
    'repos_url': 'https://api.github.com/users/JustinWebb/repos',
    'events_url': 'https://api.github.com/users/JustinWebb/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/JustinWebb/received_events',
    'type': 'User',
    'site_admin': false
  },
  'milestone': null,
  'comments': 0,
  'created_at': '2015-05-30T00:16:35Z',
  'updated_at': '2015-05-30T00:44:37Z',
  'closed_at': null,
  'body': 'Type:\ * issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data'
  }
];
/* 
* @Author: kuychaco
* @Date:   2015-05-29 22:01:07
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-06-05 10:24:55
*/

'use strict';

// DATABASE SCHEMA
var label = {
  'id': 1  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/bug',
  'name': 'bug',
  'color': 'fc2929',
  'repo_id': 1
};

// DATABASE SCHEMA
var labels = [
  {
  'id': 1,  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/bug',
  'name': 'bug',
  'color': 'fc2929'
  'repo_id': 1
  },
  {
  'id': 2,  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/duplicate',
  'name': 'duplicate',
  'color': 'cccccc'
  'repo_id': 1
  },
  {
  'id': 3,  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/enhancement',
  'name': 'enhancement',
  'color': '84b6eb'
  'repo_id': 1
  },
  {
  'id': 4,  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/help%20wanted',
  'name': 'help wanted',
  'color': '159818'
  'repo_id': 1
  },
  {
  'id': 5,  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/invalid',
  'name': 'invalid',
  'color': 'e6e6e6'
  'repo_id': 1
  },
  {
  'id': 6,  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/question',
  'name': 'question',
  'color': 'cc317c'
  'repo_id': 1
  },
  {
  'id': 7,  // PRIMARY KEY
  'url': 'https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/wontfix',
  'name': 'wontfix',
  'color': 'ffffff',
  'repo_id': 1
  }
];

// GITHUB JSON
// https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels
var labels = [
  {
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
  }
];
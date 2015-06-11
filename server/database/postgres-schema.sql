/* 
* @Author: kuychaco
* @Date:   2015-05-30 15:14:34
* @Last Modified by:   kuychaco
*/

-- ---
-- Table 'users'
--   Foreign keys: repo_list elements (not enforced)
-- ---

CREATE TABLE IF NOT EXISTS users (
  id integer, -- 7910250,  // PRIMARY KEY
  login text, -- "kuychaco",
  avatar_url text, -- "https://avatars.githubusercontent.com/u/7910250?v=3",
  url text, -- "https://api.github.com/users/kuychaco",
  html_url text, -- "https://github.com/kuychaco",
  organizations_url text, -- "https://api.github.com/users/kuychaco/orgs",
  repos_url text, -- "https://api.github.com/users/kuychaco/repos",
  name text, -- "Katrina Uychaco",
  email text, -- "kuychaco@gmail.com",
  created_at text, -- "2014-06-17T07:30:41Z",
  updated_at text, -- "2015-05-15T18:04:53Z",
  repo_list integer ARRAY, -- [1,2]
  PRIMARY KEY (id)
);


-- ---
-- Table 'repos'
--   Foreign keys: none
-- ---

CREATE TABLE IF NOT EXISTS repos (
  id serial, -- 1,  // PRIMARY KEY
  user_or_org text, -- "relentlessbreakfast",
  name text, -- "sampleGraph"
  PRIMARY KEY (id)
);


-- ---
-- Table 'labels'
--   Foreign keys: repo_id
-- ---

CREATE TABLE IF NOT EXISTS labels (
  -- id serial, -- 1  // PRIMARY KEY
  url text, -- "https://api.github.com/repos/relentlessbreakfast/sampleGraph/labels/bug",
  name text, -- "bug",
  color text, -- "fc2929",
  -- repo_id integer REFERENCES repos (id), -- "1"
  PRIMARY KEY (name)
);


-- ---
-- Table 'comments'
--   Foreign keys: creator
-- ---

CREATE TABLE IF NOT EXISTS comments (
  id integer, -- 106990292,  // PRIMARY KEY
  url text, -- "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/comments/106990292",
  html_url text, -- "https://github.com/relentlessbreakfast/sampleGraph/issues/7#issuecomment-106990292",
  issue_url text, -- "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7",
  creator integer REFERENCES users (id), -- 7910250,
  created_at text, -- "2015-05-30T05:03:44Z",
  updated_at text, -- "2015-05-30T05:03:44Z",
  body text, -- "Comment 1"
  PRIMARY KEY (id)
);


-- ---
-- Table 'issues'
--   Foreign keys: creator, assignee, labels elements
-- ---

CREATE TABLE IF NOT EXISTS issues (
  id integer, -- 82639733, // PRIMARY KEY
  url text, -- "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7",
  labels_url text, -- "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/labels{/name}",
  comments_url text, -- "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/comments",
  events_url text, -- "https://api.github.com/repos/relentlessbreakfast/sampleGraph/issues/7/events",
  html_url text, -- "https://github.com/relentlessbreakfast/sampleGraph/issues/7",
  number_github integer, -- 7,
  title text, -- "Make sample graph data",
  creator integer REFERENCES users (id), -- 1445825,
  labels integer ARRAY, -- [6],
  state text, -- "open",
  locked boolean, -- false,
  assignee integer REFERENCES users (id), -- 1445825,
  comments integer, -- 2,
  created_at text, -- "2015-05-30T00:18:26Z",
  updated_at text, -- "2015-05-30T00:43:54Z",
  closed_at text, -- null,
  body text, -- "type:\ * Issue\ \ Upstream:\ * entry\ \ Downstream:\ * Cluster-Repo Selection Screen\ * Make sample graph data"
  PRIMARY KEY (id)
);



-- ---
-- Table 'clusters'
--   Foreign keys: endponts elements, creator
-- ---

CREATE TABLE IF NOT EXISTS clusters (
  id serial, -- 1,  // PRIMARY KEY
  abbrev text, -- "ROOT",  // must be less than 32 chars
  name text, -- "Project Root",
  description text, -- "Cluster of entire project",
  endpoints integer ARRAY, -- [2, 3],  // these foreign key IDs for entries in NODES table
  creator integer REFERENCES users (id), -- 1445825,  // foreign key ID for entry in USERS table
  children_count integer,
  children_complete integer,
  PRIMARY KEY (id)
);



-- ---
-- Table 'nodes'
--   Foreign keys: cluster_id, issue_id, upsream_nodes, downstream_nodes
-- ---

CREATE TABLE IF NOT EXISTS nodes (
  id serial, -- 1, // PRIMARY KEY
  type text, -- "cluster",
  parent_cluster integer, -- NULL, // foreign key ID from NODES table
  cluster_id integer REFERENCES clusters (id), -- 1, // foreign key ID from CLUSTERS table
  issue_id integer REFERENCES issues (id), -- NULL, // foreign key ID from ISSUES table
  upstream_nodes integer ARRAY, -- [], // foreign key ID from NODES table
  downstream_nodes integer ARRAY, -- [], // foreign key ID from NODES table
  PRIMARY KEY (id)
);


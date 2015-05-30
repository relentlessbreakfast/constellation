/* 
* @Author: kuychaco
* @Date:   2015-05-29 10:54:46
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-05-29 22:38:07
*/

/*

 */

-- ---
-- Table 'users'
--   Synced with GitHub API
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  login VARCHAR, -- "kuychaco",
  id INTEGER, -- 7910250,
  avatar_url VARCHAR DEFAULT NULL, -- "https://avatars.githubusercontent.com/u/7910250?v=3",
  url VARCHAR DEFAULT NULL, -- "https://api.github.com/users/kuychaco",
  html_url VARCHAR DEFAULT NULL, -- "https://github.com/kuychaco",
  organizations_url VARCHAR DEFAULT NULL, -- "https://api.github.com/users/kuychaco/orgs",
  repos_url VARCHAR DEFAULT NULL, -- "https://api.github.com/users/kuychaco/repos",
  name VARCHAR DEFAULT NULL, -- "Katrina Uychaco",
  email VARCHAR DEFAULT NULL, -- "kuychaco@gmail.com",
  created_at VARCHAR DEFAULT NULL, -- "2014-06-17T07:30:41Z",
  updated_at VARCHAR DEFAULT NULL, -- "2015-05-15T18:04:53Z"
  PRIMARY KEY (id)
);


-- ---
-- Table 'repos'
--   Synced with GitHub API
-- ---

DROP TABLE IF EXISTS repos;
    
CREATE TABLE repos (
/*TODO*/
);

-- ---
-- Table 'labels'
--   Synced with GitHub API
-- ---

DROP TABLE IF EXISTS labels;
    
CREATE TABLE labels (
  id SERIAL,
  url VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  color VARCHAR DEFAULT NULL,
  repo_id VARCHAR,
  PRIMARY KEY (id)
);

-- ---
-- Table 'issues'
--   Synced with GitHub API
--   Foreign Keys:
--     (id_github_user) REFERENCES users (id_github);
--     (id_github_assignee) REFERENCES users (id_github);
--     (id_labels_array) REFERENCES labels (id);
-- ---

DROP TABLE IF EXISTS issues;
    
CREATE TABLE issues (
  id_github INTEGER,
  html_url VARCHAR DEFAULT NULL,
  api_url VARCHAR DEFAULT NULL,
  numb INTEGER DEFAULT NULL,  -- changed 'number' to 'numb'
  title VARCHAR DEFAULT NULL,
  id_github_user INTEGER DEFAULT NULL,
  id_github_assignee INTEGER DEFAULT NULL,
  id_labels_array INTEGER ARRAY DEFAULT NULL,
  state VARCHAR DEFAULT NULL,
  locked VARCHAR DEFAULT NULL,
  created_at VARCHAR DEFAULT NULL,
  updated_at VARCHAR DEFAULT NULL,
  closed_at VARCHAR DEFAULT NULL,
  body VARCHAR DEFAULT NULL,
  PRIMARY KEY (id_github)
);

-- ---
-- Table 'clusters'
--   NOT synced with GitHub API
--   Foreign Keys:
--     (id_nodes_upstream_array) REFERENCES nodes (id);
--     (id_nodes_downstream_array) REFERENCES nodes (id);
--     (id_nodes_endpoints_array) REFERENCES nodes (id);
--     (id_github_creator) REFERENCES users (id_github);
-- ---

DROP TABLE IF EXISTS clusters;
    
CREATE TABLE clusters (
  id INTEGER,
  abbrev VARCHAR DEFAULT 'NULL',
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  id_nodes_endpoints_array INTEGER ARRAY DEFAULT NULL,
  id_github_creator INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'nodes'
--   NOT synced with GitHub API
--   Foreign Keys:
--     (id_parent) REFERENCES clusters (id);
--     (id_clusters) REFERENCES clusters (id);
--     (id_github_issues) REFERENCES issues (id_github);
--     (id_nodes_upstream_array) REFERENCES nodes (id);
--     (id_nodes_downstream_array) REFERENCES nodes (id);
-- ---

DROP TABLE IF EXISTS nodes;
    
CREATE TABLE nodes (
  id INTEGER,
  type VARCHAR DEFAULT NULL,
  id_parent INTEGER DEFAULT NULL,
  id_clusters INTEGER DEFAULT NULL,
  id_github_issues INTEGER DEFAULT NULL,
  id_nodes_upstream_array INTEGER ARRAY DEFAULT NULL,
  id_nodes_downstream_array INTEGER ARRAY DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'comments'
--   Synced with GitHub API
--   Foreign Keys:
--     (id_github_users) REFERENCES users (id_github);
-- ---

DROP TABLE IF EXISTS comments;
    
CREATE TABLE comments (
  id_github INTEGER,
  api_url VARCHAR DEFAULT NULL,
  html_url VARCHAR DEFAULT NULL,
  issue_url VARCHAR DEFAULT NULL,
  created_at VARCHAR DEFAULT NULL,
  updated_at VARCHAR DEFAULT NULL,
  body VARCHAR DEFAULT NULL,
  id_github_users INTEGER DEFAULT NULL,
  PRIMARY KEY (id_github)
);

-- ---
-- Foreign Keys 
-- ---

-- TODO: Syntax for array element foreign keys not working
--   http://blog.2ndquadrant.com/postgresql-9-3-development-array-element-foreign-keys/
ALTER TABLE nodes ADD FOREIGN KEY (id_parent) REFERENCES clusters (id);
ALTER TABLE nodes ADD FOREIGN KEY (id_clusters) REFERENCES clusters (id);
ALTER TABLE nodes ADD FOREIGN KEY (id_github_issues) REFERENCES issues (id_github);
-- ALTER TABLE nodes ADD FOREIGN KEY (id_nodes_upstream_array) ELEMENT REFERENCES nodes;
-- ALTER TABLE nodes ADD FOREIGN KEY (id_nodes_downstream_array) ELEMENT REFERENCES nodes;
-- ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_upstream_array) ELEMENT REFERENCES nodes;
-- ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_downstream_array) ELEMENT REFERENCES nodes;
-- ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_endpoints_array) ELEMENT REFERENCES nodes;
ALTER TABLE clusters ADD FOREIGN KEY (id_github_creator) REFERENCES users (id_github);
-- ALTER TABLE issues ADD FOREIGN KEY (id_nodes_upstream_array) ELEMENT REFERENCES nodes;
-- ALTER TABLE issues ADD FOREIGN KEY (id_nodes_downstream_array) ELEMENT REFERENCES nodes;
ALTER TABLE issues ADD FOREIGN KEY (id_github_user) REFERENCES users (id_github);
ALTER TABLE issues ADD FOREIGN KEY (id_github_assignee) REFERENCES users (id_github);
-- ALTER TABLE issues ADD FOREIGN KEY (id_labels_array) ELEMENT REFERENCES labels;
ALTER TABLE comments ADD FOREIGN KEY (id_github_users) REFERENCES users (id_github);



-- ---
-- Test Data
-- ---

-- INSERT INTO nodes (id,type,parent,id_clusters,id_github_issues,id_nodes_upstream_array,id_node ARRAYs_downstream_array) VALUES ARRAY
-- ('','','','','','','');
-- INSERT INTO clusters (id,code,text,description,id_nodes_upstream_array,id_node ARRAYs_downstream_array,id_node ARRAYs_endpoints_array,id_gith ARRAYub_creator) VALUES
-- ('','','','','','','','');
-- INSERT INTO issues (id_github,id_nodes_upstream_array,id_node ARRAYs_downstream_array,html_ur ARRAYl,api_url,number,title,id_github_user,id_github_assignee,id_labels_array,state,l ARRAYocked,created_at,updated_at,closed_at,body) VALUES
-- ('','','','','','','','','','','','','','','','');
-- INSERT INTO users (id_github,login,avatar_url,api_url,html_url) VALUES
-- ('','','','','');
-- INSERT INTO labels (id,url,name,color) VALUES
-- ('','','','');
-- INSERT INTO comments (id_github,api_url,html_url,issue_url,created_at,updated_at,body,id_github_users) VALUES
-- ('','','','','','','','');


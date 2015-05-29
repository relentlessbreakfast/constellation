/*
* @Author: kuychaco
* @Date:   2015-05-28 17:02:05
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-05-28 23:05:35
*/





-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'nodes'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id_github INTEGER DEFAULT NULL,
  login VARCHAR DEFAULT NULL,
  avatar_url VARCHAR DEFAULT NULL,
  api_url VARCHAR DEFAULT NULL,
  html_url VARCHAR DEFAULT NULL,
  PRIMARY KEY (id_github)
);

-- ---
-- Table 'labels'
--
-- ---

DROP TABLE IF EXISTS labels;

CREATE TABLE labels (
  id INTEGER DEFAULT NULL,
  url VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  color VARCHAR DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS nodes;

CREATE TABLE nodes (
  id INTEGER DEFAULT NULL,
  type VARCHAR DEFAULT NULL,
  parent INTEGER DEFAULT NULL,
  id_clusters INTEGER DEFAULT NULL,
  id_github_issues INTEGER DEFAULT NULL,
  id_nodes_upstream_array INTEGER ARRAY DEFAULT NULL,
  id_nodes_downstream_array INTEGER ARRAY DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'clusters'
--
-- ---

DROP TABLE IF EXISTS clusters;

CREATE TABLE clusters (
  id INTEGER DEFAULT NULL,
  code VARCHAR DEFAULT 'NULL',
  text VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  id_nodes_upstream_array INTEGER ARRAY DEFAULT NULL,
  id_nodes_downstream_array INTEGER ARRAY DEFAULT NULL,
  id_nodes_endpoints_array INTEGER ARRAY DEFAULT NULL,
  id_github_creator INTEGER DEFAULT NULL,
  id_github_assignee INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'issues'
--
-- ---

DROP TABLE IF EXISTS issues;

CREATE TABLE issues (
  id_github INTEGER DEFAULT NULL,
  id_nodes_upstream_array INTEGER ARRAY DEFAULT NULL,
  id_nodes_downstream_array INTEGER ARRAY DEFAULT NULL,
  html_url VARCHAR DEFAULT NULL,
  api_url VARCHAR DEFAULT NULL,
  number INTEGER DEFAULT NULL,
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
-- Table 'users'
--
-- ---

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id_github INTEGER DEFAULT NULL,
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

ALTER TABLE nodes ADD FOREIGN KEY (id_clusters) REFERENCES clusters (id);
ALTER TABLE nodes ADD FOREIGN KEY (id_github_issues) REFERENCES issues (id_github);
ALTER TABLE nodes ADD FOREIGN KEY (id_nodes_upstream_array) REFERE ARRAYNCES nodes (id);
ALTER TABLE nodes ADD FOREIGN KEY (id_nodes_downstream_array) REFERE ARRAYNCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_upstream_array) REFERE ARRAYNCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_downstream_array) REFERE ARRAYNCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_endpoints_array) REFERE ARRAYNCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_github_creator) REFERENCES users (id_github);
ALTER TABLE issues ADD FOREIGN KEY (id_nodes_upstream_array) REFERE ARRAYNCES nodes (id);
ALTER TABLE issues ADD FOREIGN KEY (id_nodes_downstream_array) REFERE ARRAYNCES nodes (id);
ALTER TABLE issues ADD FOREIGN KEY (id_github_user) REFERENCES users (id_github);
ALTER TABLE issues ADD FOREIGN KEY (id_github_assignee) REFERENCES users (id_github);
ALTER TABLE issues ADD FOREIGN KEY (id_labels_array) REFERE ARRAYNCES labels (id);
ALTER TABLE comments ADD FOREIGN KEY (id_github_users) REFERENCES users (id_github);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE nodes ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE clusters ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE issues ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE users ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE labels ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE comments ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

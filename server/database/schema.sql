



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'nodes'
--
-- ---

DROP TABLE IF EXISTS nodes;

CREATE TABLE nodes (
  id INTEGER PRIMARY KEY,
  type TEXT NOT NULL,
  parent INTEGER DEFAULT NULL,
  id_clusters INTEGER REFERENCES clusters (id),
  id_github_issues INTEGER REFERENCES issues (id),
  id_nodes_upstream_array INTEGER[] ELEMENT REFERENCES nodes (id),
  id_nodes_downstream_array INTEGER[] ELEMENT REFERENCES nodes (id)
);

-- ---
-- Table 'clusters'
--
-- ---

DROP TABLE IF EXISTS clusters;

CREATE TABLE clusters (
  id INTEGER PRIMARY KEY,
  code TEXT DEFAULT NULL,
  text TEXT DEFAULT NULL,
  description TEXT DEFAULT NULL,
  id_nodes_upstream_array INTEGER[] ELEMENT REFERENCES nodes (id),
  id_nodes_downstream_array INTEGER[] ELEMENT REFERENCES nodes (id),
  id_nodes_endpoints_array INTEGER[] ELEMENT REFERENCES nodes (id),
  id_github_creator INTEGER REFERENCES users (id)
  id_github_assignee INTEGER REFERENCES users (id)
);

-- ---
-- Table 'issues'
--
-- ---

DROP TABLE IF EXISTS issues;

CREATE TABLE issues (
  id INTEGER PRIMARY KEY, --same as github id
  id_nodes_upstream_array INTEGER[] ELEMENT REFERENCES nodes (id),
  id_nodes_downstream_array INTEGER[] ELEMENT REFERENCES nodes (id),
  html_url TEXT DEFAULT NULL,
  api_url TEXT DEFAULT NULL,
  num INTEGER DEFAULT NULL, --originally 'number'
  title TEXT DEFAULT NULL,
  id_github_user INTEGER REFERENCES users (id),
  id_github_assignee INTEGER REFERENCES users (id),
  id_labels_array TEXT[] REFERENCES labels (url),
  state TEXT DEFAULT NULL,
  locked TEXT DEFAULT NULL,
  created_at DATETIME DEFAULT NULL,
  updated_at DATETIME DEFAULT NULL,
  closed_at DATETIME DEFAULT NULL,
  body TEXT DEFAULT NULL
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY, --same as github id
  login TEXT DEFAULT NULL,
  avatar_url TEXT DEFAULT NULL,
  api_url TEXT DEFAULT NULL,
  html_url TEXT DEFAULT NULL,
  PRIMARY KEY (id_github)
);

-- ---
-- Table 'labels'
--
-- ---

DROP TABLE IF EXISTS labels;

CREATE TABLE labels (
  url TEXT PRIMARY KEY,
  name TEXT DEFAULT NULL,
  color TEXT DEFAULT NULL
);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id INTEGER PRIMARY KEY, --same as github id
  api_url TEXT DEFAULT NULL,
  html_url TEXT DEFAULT NULL,
  issue_url TEXT DEFAULT NULL,
  created_at DATETIME DEFAULT NULL,
  updated_at DATETIME DEFAULT NULL,
  body TEXT DEFAULT NULL,
  id_github_users INTEGER DEFAULT NULL,
  PRIMARY KEY (id_github)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE nodes ADD FOREIGN KEY (id_clusters) REFERENCES clusters (id);
ALTER TABLE nodes ADD FOREIGN KEY (id_github_issues) REFERENCES issues (id_github);
ALTER TABLE nodes ADD FOREIGN KEY (id_nodes_upstream_array) REFERENCES nodes (id);
ALTER TABLE nodes ADD FOREIGN KEY (id_nodes_downstream_array) REFERENCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_upstream_array) REFERENCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_downstream_array) REFERENCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_nodes_endpoints_array) REFERENCES nodes (id);
ALTER TABLE clusters ADD FOREIGN KEY (id_github_creator) REFERENCES users (id_github);
ALTER TABLE issues ADD FOREIGN KEY (id_nodes_upstream_array) REFERENCES nodes (id);
ALTER TABLE issues ADD FOREIGN KEY (id_nodes_downstream_array) REFERENCES nodes (id);
ALTER TABLE issues ADD FOREIGN KEY (id_github_user) REFERENCES users (id_github);
ALTER TABLE issues ADD FOREIGN KEY (id_github_assignee) REFERENCES users (id_github);
ALTER TABLE issues ADD FOREIGN KEY (id_labels_array) REFERENCES labels (id);
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

-- INSERT INTO nodes (id,type,parent,id_clusters,id_github_issues,id_nodes_upstream_array,id_nodes_downstream_array) VALUES
-- ('','','','','','','');
-- INSERT INTO clusters (id,code,text,description,id_nodes_upstream_array,id_nodes_downstream_array,id_nodes_endpoints_array,id_github_creator) VALUES
-- ('','','','','','','','');
-- INSERT INTO issues (id_github,id_nodes_upstream_array,id_nodes_downstream_array,html_url,api_url,number,title,id_github_user,id_github_assignee,id_labels_array,state,locked,created_at,updated_at,closed_at,body) VALUES
-- ('','','','','','','','','','','','','','','','');
-- INSERT INTO users (id_github,login,avatar_url,api_url,html_url) VALUES
-- ('','','','','');
-- INSERT INTO labels (id,url,name,color) VALUES
-- ('','','','');
-- INSERT INTO comments (id_github,api_url,html_url,issue_url,created_at,updated_at,body,id_github_users) VALUES
-- ('','','','','','','','');

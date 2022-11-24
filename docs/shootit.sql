#drop database shootit;
create database shootit;
use shootit;

CREATE TABLE users(
	id INT AUTO_INCREMENT,
	name_ VARCHAR(100),
	username VARCHAR(100) UNIQUE,
	email VARCHAR(300) UNIQUE,
	password_ VARCHAR(100),
    photo_profile VARCHAR(512) NULL,
    date_ DATE DEFAULT (CURRENT_DATE),
	PRIMARY KEY(id)
);

CREATE TABLE followers(
	id INT AUTO_INCREMENT,
	fk_pk_user INT,
    fk_pk_user_follower INT,
    FOREIGN KEY (fk_pk_user) REFERENCES users (id),
    FOREIGN KEY (fk_pk_user_follower) REFERENCES users (id),
    date_ DATE DEFAULT (CURRENT_DATE), 
	PRIMARY KEY(id)
);

CREATE TABLE publications(
	id INT AUTO_INCREMENT,
	fk_pk_user INT,
    title TEXT,
    publication_path VARCHAR(512),
    date_ DATE DEFAULT (CURRENT_DATE), 
    FOREIGN KEY (fk_pk_user) REFERENCES users (id),
    ubication VARCHAR(100) NULL,
	PRIMARY KEY(id)
);

CREATE TABLE tags (
	id INT AUTO_INCREMENT,
    fk_pk_user INT,
    fk_pk_publication INT,
    FOREIGN KEY (fk_pk_user) REFERENCES users (id),
    FOREIGN KEY (fk_pk_publication) REFERENCES publications (id),
	PRIMARY KEY(id)
);


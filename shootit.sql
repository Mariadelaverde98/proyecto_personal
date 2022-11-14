#drop database shootit;
#create database shootit;
#use shootit;

CREATE TABLE users(
	id INT AUTO_INCREMENT,
	nombre VARCHAR(100),
	nombre_usuario VARCHAR(100) UNIQUE,
	email VARCHAR(300) UNIQUE,
	contrasenia VARCHAR(50),
    foto_perfil VARCHAR(512) NULL,
    fecha_registro DATE DEFAULT (CURRENT_DATE),
	PRIMARY KEY(id)
);

CREATE TABLE friends(
	id INT AUTO_INCREMENT,
	fk_pk_user1 INT,
    fk_pk_user2 INT,
    FOREIGN KEY (fk_pk_user1) REFERENCES users (id),
    FOREIGN KEY (fk_pk_user1) REFERENCES users (id),
    fecha_amistad DATE DEFAULT (CURRENT_DATE), 
	PRIMARY KEY(id)
);

CREATE TABLE publications(
	id INT AUTO_INCREMENT,
	fk_pk_user INT,
    publicacion VARCHAR(512),
    fecha_publicacion DATE DEFAULT (CURRENT_DATE), 
    FOREIGN KEY (fk_pk_user) REFERENCES users (id),
    ubicacion VARCHAR(100) NULL,
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


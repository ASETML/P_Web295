-- ETML
-- Auteurs : Alban Segalen, Mateo Thode, Antoine Fabre
-- Date : 11.02.2024
-- Script de création de la base de données db_livres_295

DROP DATABASE IF EXISTS db_livres_295;
CREATE DATABASE db_livres_295;
USE db_livres_295;

-- Structure des tables générée par Looping
CREATE TABLE t_utilisateur(
   compte_id INT AUTO_INCREMENT,
   pseudo VARCHAR(50) NOT NULL,
   date_inscription DATE NOT NULL,
   PRIMARY KEY(compte_id),
   UNIQUE(pseudo)
);

CREATE TABLE t_categorie(
   categorie_id INT AUTO_INCREMENT,
   nom VARCHAR(50) NOT NULL,
   PRIMARY KEY(categorie_id),
   UNIQUE(nom)
);

CREATE TABLE t_editeur(
   editeur_id INT AUTO_INCREMENT,
   nom VARCHAR(50) NOT NULL,
   PRIMARY KEY(editeur_id),
   UNIQUE(nom)
);

CREATE TABLE t_ecrivain(
   ecrivain_id INT AUTO_INCREMENT,
   nom VARCHAR(50) NOT NULL,
   prenom VARCHAR(50) NOT NULL,
   PRIMARY KEY(ecrivain_id)
);

CREATE TABLE t_livre(
   livre_id INT AUTO_INCREMENT,
   titre VARCHAR(50) NOT NULL,
   nombre_pages INT NOT NULL,
   extrait VARCHAR(150) NOT NULL,
   resume TEXT NOT NULL,
   annee_edition SMALLINT NOT NULL,
   image VARCHAR(150) NOT NULL,
   utilisateur_fk INT NOT NULL,
   categorie_fk INT NOT NULL,
   editeur_fk INT NOT NULL,
   ecrivain_fk INT NOT NULL,
   PRIMARY KEY(livre_id),
   UNIQUE(extrait),
   FOREIGN KEY(utilisateur_fk) REFERENCES t_utilisateur(compte_id),
   FOREIGN KEY(categorie_fk) REFERENCES t_categorie(categorie_id),
   FOREIGN KEY(editeur_fk) REFERENCES t_editeur(editeur_id),
   FOREIGN KEY(ecrivain_fk) REFERENCES t_ecrivain(ecrivain_id)
);

CREATE TABLE t_apprecier(
   livre_fk INT,
   utilisateur_fk INT,
   note TINYINT NOT NULL,
   PRIMARY KEY(livre_fk, utilisateur_fk),
   FOREIGN KEY(livre_fk) REFERENCES t_livre(livre_id),
   FOREIGN KEY(utilisateur_fk) REFERENCES t_utilisateur(compte_id)
);

CREATE TABLE t_commenter(
   livre_fk INT,
   utilisateur_fk INT,
   commentaire TEXT NOT NULL,
   PRIMARY KEY(livre_fk, utilisateur_fk),
   FOREIGN KEY(livre_fk) REFERENCES t_livre(livre_id),
   FOREIGN KEY(utilisateur_fk) REFERENCES t_utilisateur(compte_id)
);

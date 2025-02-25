import { Sequelize, DataTypes } from "sequelize";
import {
  db_dialect,
  db_host,
  database,
  db_logs,
  db_password,
  db_port,
  db_user,
} from "../config.mjs";

//Info de connection à la DB
const sequelize = new Sequelize(database, db_user, db_password, {
  host: db_host,
  port: db_port,
  dialect: db_dialect,
  logging: db_logs,
});

//Modèle utilisateur
import { utilisateurModel } from "../models/utilisateur.mjs";
const Utilisateur = utilisateurModel(sequelize, DataTypes);

//Modèle catégorie
import { categorieModel } from "../models/categorie.mjs";
const Categorie = categorieModel(sequelize, DataTypes);

//Modèle écrivain
import { ecrivainModel } from "../models/ecrivain.mjs";
const Ecrivain = ecrivainModel(sequelize, DataTypes);

//Modèle éditeur
import { editeurModel } from "../models/editeur.mjs";
const Editeur = editeurModel(sequelize, DataTypes);

//Modèle apprécier
import { apprecierModel } from "../models/apprecier.mjs";
const Apprecier = apprecierModel(sequelize, DataTypes);

//Modèle commenter
import { commenterModel } from "../models/commenter.mjs";
const Commenter = commenterModel(sequelize, DataTypes);

//Modèle livre
import { livreModel } from "../models/livre.mjs";
const Livre = livreModel(sequelize, DataTypes);

let initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    importUtilisateur();
    importCategorie();
    importEcrivain();
    importEditeur();
    importLivre();
    importAppreciation();
    importCommentaire();
    console.log("La base de données db_livres_295 a bien été synchronisée");
  });
};

//Seed utilisateurs
import { utilisateurs } from "./mock-utilisateur.mjs";
const importUtilisateur = () => {
  utilisateurs.map((utilisateur) => {
    Utilisateur.create({
      compte_id: utilisateur.id,
      pseudo: utilisateur.pseudo,
      date_inscription: utilisateur.date_inscription,
      mot_de_passe: utilisateur.mot_de_passe,
      admin: utilisateur.admin,
    });
    console.log(utilisateur);
  });
};

//Seed catégories
import { categories } from "./mock-categorie.mjs";
const importCategorie = () => {
  categories.map((categorie) => {
    Categorie.create({
      categorie_id: categorie.id,
      nom: categorie.nom,
    });
    console.log(categorie);
  });
};

//Seed écrivains
import { ecrivains } from "./mock-ecrivain.mjs";
const importEcrivain = () => {
  ecrivains.map((ecrivain) => {
    Ecrivain.create({
      ecrivain_id: ecrivain.id,
      nom: ecrivain.nom,
      prenom: ecrivain.prenom,
    });
    console.log(ecrivain);
  });
};

//Seed éditeurs
import { editeurs } from "./mock-editeur.mjs";
const importEditeur = () => {
  editeurs.map((editeur) => {
    Editeur.create({
      editeur_id: editeur.id,
      nom: editeur.nom,
    });
    console.log(editeur);
  });
};

//Seed livres
import { livres } from "./mock-livre.mjs";
const importLivre = () => {
  livres.map((livre) => {
    Livre.create({
      livre_id: livre.id,
      titre: livre.titre,
      nombre_pages: livre.nombre_pages,
      extrait: livre.extrait,
      resume: livre.resume,
      annee_edition: livre.annee_edition,
      utilisateur_fk: livre.utilisateur,
      categorie_fk: livre.categorie,
      editeur_fk: livre.editeur,
      ecrivain_fk: livre.ecrivain,
    });
    console.log(livre);
  });
};

//Seed apprécier
import { apprecier } from "./mock-apprecier.mjs";
const importAppreciation = () => {
  apprecier.map((appreciation) => {
    Apprecier.create({
      livre_fk: appreciation.livre,
      utilisateur_fk: appreciation.utilisateur,
      note: appreciation.note,
    });
    console.log(appreciation);
  });
};

//Seed commenter
import { commenter } from "./mock-commenter.mjs";
const importCommentaire = () => {
  commenter.map((commentaire) => {
    Commenter.create({
      livre_fk: commentaire.livre,
      utilisateur_fk: commentaire.utilisateur,
      commentaire: commentaire.commentaire,
    });
    console.log(commentaire);
  });
};

export {
  sequelize,
  initDb,
  Livre,
  Utilisateur,
  Categorie,
  Ecrivain,
  Editeur,
  Apprecier,
  Commenter,
};

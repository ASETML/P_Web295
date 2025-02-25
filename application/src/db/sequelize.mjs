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
    console.log("La base de données db_livres_295 a bien été synchronisée");
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

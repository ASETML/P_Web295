import { utilisateurModel } from "./utilisateur.mjs";
import { categorieModel } from "./categorie.mjs";
import { editeurModel } from "./editeur.mjs";
import { ecrivainModel } from "./ecrivain.mjs";

const livreModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Livre",
    {
      livre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,;:!?\(\)'/]*$/,
            msg: "Seules les lettres, nombres, espaces et caractères de ponctuation (. , ; : ! ? - ( )) sont autorisés",
          },
          notEmpty: {
            msg: "ne peut pas etre vide",
          },
          notNull: {
            msg: "le titre est obligatoire",
          },
        },
      },
      nombre_pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "peut que etre des int",
          },
          notEmpty: {
            msg: "Le nombres de page ne peut pas etre vide.",
          },
          notNull: {
            msg: "le nombres de page est une propriété obligatoire.",
          },
          min: {
            args: [1.0],
            msg: "le nombres de page ne peut pas etre en dessous de 1",
          },
          max: {
            args: [6000.0],
            msg: "le nombres de page ne peut pas etre au dessus de 6000",
          },
        },
      },
      extrait: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            //faut que ca ressemble a une url grace a ce regex
            args: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            msg: "l'extrait doit etre une URL",
          },
          notEmpty: {
            msg: "l'extrait ne peut pas etre vide",
          },
          notNull: {
            msg: "l'extrait est obligatoire",
          },
        },
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']{2,}$/,
            msg: "Seules les lettres (y compris avec accents), les espaces et le tiret (-) sont autorisés. Minimum 2 caractères.",
          },
          notEmpty: {
            msg: "le resumé ne doit pas etre vide ",
          },
          notNull: {
            msg: "le résumé est obligatoire",
          },
        },
      },
      annee_edition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "l'année doit etre un nombre",
          },
          notEmpty: {
            msg: "L'année d'édition ne peut pas etre vide.",
          },
          notNull: {
            msg: "L'année d'édition est une propriété obligatoire.",
          },
          min: {
            args: [-5000.0],
            msg: "L'année d'édition ne peut pas etre en dessous de -5000",
          },
          max: {
            args: [3000.0],
            msg: "L'année d'édition ne peut pas etre au dessus de 3000",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            msg: "ca doit etre un lien local",
          },
          notEmpty: {
            msg: "le lien de l'image ne peut pas etre vide.",
          },
        },
      },
      utilisateur_fk: {
        type: DataTypes.INTEGER,
        referencies: {
          model: utilisateurModel,
          key: "utilisateur_id",
        },
      },
      categorie_fk: {
        type: DataTypes.INTEGER,
        referencies: {
          model: categorieModel,
          key: "categorie_id",
        },
      },
      editeur_fk: {
        type: DataTypes.INTEGER,
        referencies: {
          model: editeurModel,
          key: "editeur_id",
        },
      },
      ecrivain_fk: {
        type: DataTypes.INTEGER,
        referencies: {
          model: ecrivainModel,
          key: "ecrivain_id",
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

export { livreModel };

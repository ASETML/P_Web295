import { sequelize } from "sequelize";

const LivreModel = (sequelize, DataTypes) => {
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
        allowNul: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s\-\.\,]*$/,
            msg: "Seules les lettres, les espaces et les - sont autorisés",
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
        allowNul: false,
        validate: {
          isInteger: {
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
        allowNul: false,
        unique: {
          msg: "cette extrait est deja pris",
        },
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
        allowNul: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s\-\.\,]*$/,
            msg: "seul les lettres, les nombres, les espaces, les -, les . et les , sont autorisés",
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
        allowNul: false,
        validate: {
          isInteger: {
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
      //fk peut etre ?
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

export { LivreModel };

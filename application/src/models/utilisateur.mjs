import { sequelize } from "sequelize";

const utilisateurModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "utilisateur",
    {
      utilisateur_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNul: false,
        unique: {
          msg: "ce pseudo est deja pris",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9\s\-\.\,]*$/,
            msg: "Seules les lettres, les espaces et les - sont autorisés",
          },
          notEmpty: {
            msg: "le pseudo ne peut pas etre vide",
          },
          notNull: {
            msg: "le pseudo est obligatoire",
          },
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

export { utilisateurModel };

import { sequelize } from "sequelize";

const categorieModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "utilisateur",
    {
      categorie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNul: false,
        validate: {
          is: {
            args: /^[A-Za-z\s]*$/,
            msg: "Seules les lettres et les espaces sont autorisés",
          },
          notEmpty: {
            msg: "le nom de la categorie ne peut pas etre vide",
          },
          notNull: {
            msg: "le nom de la categorie est obligatoire",
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
export { categorieModel };

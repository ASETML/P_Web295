import { livreModel } from "./livre.mjs";
import { utilisateurModel } from "./utilisateur.mjs";
const apprecierModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Apprecier",
    {
      note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "peut que etre des int",
          },
          notEmpty: {
            msg: "La note ne peut pas etre vide.",
          },
          notNull: {
            msg: "la note est une propriété obligatoire.",
          },
          min: {
            args: [1.0],
            msg: "la note ne peut pas etre en dessous de 1",
          },
          max: {
            args: [5.0],
            msg: "la note ne peut pas etre au dessus de 5",
          },
        },
      },
      livre_fk: {
        type: DataTypes.INTEGER,
        referencies: {
          model: livreModel,
          key: "livre_id",
        },
      },
      utilisateur_fk: {
        type: DataTypes.INTEGER,
        referencies: {
          model: utilisateurModel,
          key: "utilisateur_id",
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
export { apprecierModel };

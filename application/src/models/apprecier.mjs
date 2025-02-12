import { sequelize } from "sequelize";

const apprecierModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Apprecier",
    {
      note: {
        type: DataTypes.INTEGER,
        allowNul: false,
        validate: {
          isInteger: {
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
          model: Livre,
          key: "livre_id",
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

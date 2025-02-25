import { livreModel } from "./livre.mjs";
import { utilisateurModel } from "./utilisateur.mjs";
const commenterModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Commenter",
    {
      commentaire: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z\s\-]*$/,
            msg: "Seules les lettres et les espaces sont autorisés et les -",
          },
          notEmpty: {
            msg: "le commentaire ne peut pas etre vide",
          },
          notNull: {
            msg: "le commentaire est obligatoire",
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
export { commenterModel };

import { sequelize } from "sequelize";

const utilisateurModel = (sequelize, DataTypes) => {
  return sequelize.define("utilisateur", {
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
    },
  });
};

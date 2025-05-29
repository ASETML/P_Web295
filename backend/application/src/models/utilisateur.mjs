const utilisateurModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Utilisateur",
    {
      utilisateur_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
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
      mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "le mdp ne peut pas etre vide",
          },
          notNull: {
            msg: "le mdp est obligatoire",
          },
        },
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    },
  );
};

export { utilisateurModel };

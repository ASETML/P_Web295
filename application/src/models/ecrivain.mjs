const ecrivainModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Ecrivain",
    {
      ecrivain_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]{2,}$/,
            msg: "Seules les lettres (y compris avec accents), les espaces et le tiret (-) sont autorisés. Minimum 2 caractères.",
          },
          notEmpty: {
            msg: "le nom ne peut pas etre vide",
          },
          notNull: {
            msg: "le nom est obligatoire",
          },
        },
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z\s\-]*$/,
            msg: "Seules les lettres et les espaces sont autorisés et les -",
          },
          notEmpty: {
            msg: "le prenom ne peut pas etre vide",
          },
          notNull: {
            msg: "le prenom est obligatoire",
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
export { ecrivainModel };

const categorieModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Categorie",
    {
      categorie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\.,;:!?\(\)/]*$/,
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

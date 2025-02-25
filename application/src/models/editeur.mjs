const editeurModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Editeur",
    {
      editeur_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z\s\-]*$/,
            msg: "Seules les lettres et les espaces sont autorisés et les -",
          },
          notEmpty: {
            msg: "le nom ne peut pas etre vide",
          },
          notNull: {
            msg: "le nom est obligatoire",
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
export { editeurModel };

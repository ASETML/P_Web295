import express from "express";
import { Editeur } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

const editeurRouter = express();

editeurRouter.get("/", auth, (req, res) => {
  Editeur.findAll()
    .then((editeurs) => {
      const message = "La liste des editeurs a bien été récupérée.";
      res.json(success(message, editeurs));
    })
    .catch((error) => {
      const message = "La liste des editeurs n'a pas pu être récupérée.";
      res.status(500).json({ message, data: error });
    });
});

editeurRouter.delete("/:id", auth, (req, res) => {
  Editeur.findByPk(req.params.id)
    .then((editeurToDelete) => {
      if (editeurToDelete === null) {
        const message = "Cet editeur n'existe pas.";
        return res.status(404).json({ message });
      }
      return Editeur.destroy({
        where: { editeur_id: editeurToDelete.editeur_id },
      }).then((_) => {
        const message = `L'editeur dont l'id vaut ${editeurToDelete.editeur_id} a bien été supprimée.`;
        res.json(success(message, {}));
      });
    })
    .catch((error) => {
      const message = "L'editeur n'a pas pu être supprimée.";
      res.status(500).json({ message, data: error });
    });
});

editeurRouter.post("/", auth, async (req, res) => {
  try {
    const newEditeur = await Editeur.create(req.body);
    res.json(
      success(`L'éditeur ${newEditeur.nom} a bien été ajouté.`, newEditeur)
    );
  } catch (error) {
    const message =
      error instanceof UniqueConstraintError
        ? "Cet éditeur existe déjà."
        : error instanceof ValidationError
        ? error.message
        : "Erreur lors de l'ajout.";
    res.status(500).json({ message, data: error });
  }
});
editeurRouter.put("/:id", auth, async (req, res) => {
  try {
    const editeur = await Editeur.findByPk(req.params.id);
    if (!editeur) {
      return res.status(404).json({ message: "Cet éditeur n'existe pas." });
    }
    await Editeur.update(req.body, { where: { editeur_id: req.params.id } });
    const updatedEditeur = await Editeur.findByPk(req.params.id);
    res.json(
      success(
        `L'éditeur ${updatedEditeur.nom} a bien été mis à jour.`,
        updatedEditeur
      )
    );
  } catch (error) {
    const message =
      error instanceof ValidationError
        ? error.message
        : "Erreur lors de la mise à jour.";
    res.status(500).json({ message, data: error });
  }
});
export { editeurRouter };

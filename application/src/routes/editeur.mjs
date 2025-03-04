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

editeurRouter.post("/", auth, (req, res) => {
  Editeur.create(req.body)
    .then((newEditeur) => {
      const message = `L'editeur ${newEditeur.nom} a bien été ajoutée.`;
      res.json(success(message, newEditeur));
    })
    .catch((error) => {
      const message = "L'editeur n'a pas pu être ajoutée.";
      res.status(500).json({ message, data: error });
    });
});
editeurRouter.put("/:id", auth, (req, res) => {
  const editeurId = req.params.id;
  Editeur.update(req.body, { where: { editeur_id: editeurId } })
    .then((_) => {
      Editeur.findByPk(editeurId).then((updatedEditeur) => {
        if (updatedEditeur === null) {
          const message = "Cet editeur n'existe pas.";
          return res.status(404).json({ message });
        }
        const message = `L'editeur ${updatedEditeur.nom} dont l'id vaut ${updatedEditeur.editeur_id} a bien été mise à jour.`;
        res.json(success(message, updatedEditeur));
      });
    })
    .catch((error) => {
      const message = "L'editeur n'a pas pu être mise à jour.";
      res.status(500).json({ message, data: error });
    });
});

export { editeurRouter };

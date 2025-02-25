import express from "express";
import { categorie } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

const categorieRouter = express();

// Liste des catégories
categorieRouter.get("/", auth, (req, res) => {
  categorie
    .findAll()
    .then((categories) => {
      const message = "La liste des catégories a bien été récupérée.";
      res.json(success(message, categories));
    })
    .catch((error) => {
      const message = "La liste des catégories n'a pas pu être récupérée.";
      res.status(500).json({ message, data: error });
    });
});

// Modification d'une catégorie
categorieRouter.put("/:id", auth, (req, res) => {
  // On attend en entrée un objet { nom }
  const categorieId = req.params.id;
  categorie
    .update(req.body, { where: { categorie_id: categorieId } })
    .then((_) => {
      categorie.findByPk(categorieId).then((updatedCategorie) => {
        if (updatedCategorie === null) {
          const message = "Cette catégorie n'existe pas.";
          return res.status(404).json({ message });
        }
        const message = `La catégorie ${updatedCategorie.nom} dont l'id vaut ${updatedCategorie.categorie_id} a bien été mise à jour.`;
        res.json(success(message, updatedCategorie));
      });
    })
    .catch((error) => {
      const message = "La catégorie n'a pas pu être mise à jour.";
      res.status(500).json({ message, data: error });
    });
});

// Suppression d'une catégorie
categorieRouter.delete("/:id", auth, (req, res) => {
  categorie
    .findByPk(req.params.id)
    .then((categorieToDelete) => {
      if (categorieToDelete === null) {
        const message = "Cette catégorie n'existe pas.";
        return res.status(404).json({ message });
      }
      return categorie
        .destroy({ where: { categorie_id: categorieToDelete.categorie_id } })
        .then(() => {
          const message = `La catégorie dont l'id vaut ${categorieToDelete.categorie_id} a bien été supprimée.`;
          res.json(success(message, {}));
        });
    })
    .catch((error) => {
      const message = "La catégorie n'a pas pu être supprimée.";
      res.status(500).json({ message, data: error });
    });
});

// Ajout d'une catégorie
categorieRouter.post("/", auth, (req, res) => {
  // On attend en entrée un objet { nom }
  categorie
    .create(req.body)
    .then((newCategorie) => {
      const message = `La catégorie ${newCategorie.nom} a bien été ajoutée.`;
      res.json(success(message, newCategorie));
    })
    .catch((error) => {
      const message = "La catégorie n'a pas pu être ajoutée.";
      res.status(500).json({ message, data: error });
    });
});

export { categorieRouter };

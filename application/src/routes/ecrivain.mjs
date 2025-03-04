import express from "express";
import { Ecrivain } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

const ecrivainRouter = express();

ecrivainRouter.get("/", auth, (req, res) => {
  Ecrivain.findAll()
    .then((ecrivains) => {
      const message = " voici tous les écrivains";
      res.json(success(message, ecrivains));
    })
    .catch((error) => {
      const message = "La liste des écrivains n'a pas pu être récupérée.";
      res.status(500).json({ message, data: error });
    });
});

ecrivainRouter.delete("/:id", auth, (req, res) => {
  Ecrivain.findByPk(req.params.id).then((ecrivainSupp) => {
    if (ecrivainSupp === null) {
      const message = "Cet écrivains n'existe pas.";
      return res.status(404).json({ message });
    }
    return Ecrivain.destroy({
      where: { ecrivain_id: ecrivainSupp.ecrivain_id },
    }).then((_) => {
      const message = `La catégorie dont l'id vaut ${ecrivainSupp.ecrivain_id} a bien été supprimée.`;
      res.json(success(message, {}));
    });
  });
});

ecrivainRouter.post("/", auth, (req, res) => {
  Ecrivain.create(req.body)
    .then((newEcrivain) => {
      const message = `L'écrivain ${newEcrivain.nom} a bien été ajoutée.`;
      res.json(success(message, newEcrivain));
    })
    .catch((error) => {
      const message = "L'écrivain n'a pas pu être ajoutée.";
      res.status(500).json({ message, data: error });
    });
});

ecrivainRouter.put("/:id", auth, (req, res) => {
  const ecrivainId = req.params.id;
  Ecrivain.update(req.body, { where: { ecrivain_id: ecrivainId } })
    .then((_) => {
      Ecrivain.findByPk(ecrivainId).then((updatedEcrivain) => {
        if (updatedEcrivain === null) {
          const message = "Cet écrivain n'existe pas.";
          return res.status(404).json({ message });
        }
        const message = `L'écrivain ${updatedEcrivain.nom} dont l'id vaut ${updatedEcrivain.ecrivain_id} a bien été mise à jour.`;
        res.json(success(message, updatedEcrivain));
      });
    })
    .catch((error) => {
      const message = "L'écrivain n'a pas pu être mise à jour.";
      res.status(500).json({ message, data: error });
    });
});

export { ecrivainRouter };

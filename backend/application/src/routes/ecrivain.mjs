import express from "express";
import { Ecrivain } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";
import { Livre } from "../db/sequelize.mjs";
import { ValidationError, UniqueConstraintError, where, Op } from "sequelize";
import { ecrivains } from "../db/mock-ecrivain.mjs";

const ecrivainRouter = express();

ecrivainRouter.get("/", auth, (req, res) => {
  Ecrivain.findAll()
    .then((ecrivains) => {
      const message = " Voici tous les écrivains";
      res.json(success(message, ecrivains));
    })
    .catch((error) => {
      const message = "La liste des écrivains n'a pas pu être récupérée.";
      res.status(500).json({ message, data: error });
    });
});

ecrivainRouter.delete("/:id", auth, async (req, res) => {
  try {
    const ecrivainSupp = await Ecrivain.findByPk(req.params.id);
    if (!ecrivainSupp) {
      return res.status(404).json({ message: "Cet écrivain n'existe pas." });
    }
    await Ecrivain.destroy({
      where: { ecrivain_id: ecrivainSupp.ecrivain_id },
    });
    res.json(success(`L'écrivain ${ecrivainSupp.nom} a été supprimé.`, {}));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression.", data: error });
  }
});

ecrivainRouter.post("/", auth, (req, res) => {
  Ecrivain.findAll({
    where: { nom: { [Op.like]: req.body.nom } },
    prenom: { [Op.like]: req.body.prenom },
  }).then((ecrivains) => {
    if (ecrivains.length > 0) {
      return res
        .status(400)
        .json({ message: "Un écrivain avec ce nom existe déjà" });
    }
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

ecrivainRouter.get("/:id/livres", auth, async (req, res) => {
  try {
    const ecrivain = await Ecrivain.findByPk(req.params.id);
    if (!ecrivain) {
      return res.status(404).json({ message: "Cet écrivain n'existe pas." });
    }
    const livres = await Livre.findAll({
      where: { ecrivain_fk: req.params.id },
    });
    res.json(success("Voici les livres de cet écrivain", livres));
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des livres.",
      data: error,
    });
  }
});

export { ecrivainRouter };

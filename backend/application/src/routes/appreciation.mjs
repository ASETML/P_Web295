import express from "express";
import { auth } from "../auth/auth.mjs";
import { Apprecier } from "../db/sequelize.mjs";
import { ValidationError } from "sequelize";
import { success } from "./helper.mjs";
const appreciationRouter = express();

appreciationRouter.get("/", auth, (req, res) => {
  Apprecier.findAll()
    .then((appreciations) => {
      const message = "La liste des appréciations a bien été récupérée !";
      res.json(success(message, appreciations));
    })
    .catch((error) => {
      const message =
        "la liste des appréciations pas bien récuperée, réessayer!";

      res.status(500).json({ message, data: error });
    });
});

appreciationRouter.post("/", auth, (req, res) => {
  Apprecier.create(req.body)
    .then((createdAppreciation) => {
      const message = `l'appreciation a bien été créée`;

      res.json(success(message, createdAppreciation));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "erreur de création d'appreciation";
      res.status(500).json({ message, data: error });
    });
});

appreciationRouter.delete("/:id", auth, async (req, res) => {
  try {
    const deletedAppreciation = await Apprecier.findByPk(req.params.id);
    if (!deletedAppreciation) {
      return res
        .status(404)
        .json({ message: "Cette appréciation n'existe pas." });
    }
    await Apprecier.destroy({ where: { id: deletedAppreciation.id } });
    res.json(success("L'appréciation a été supprimée.", {}));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression.", data: error });
  }
});

appreciationRouter.put("/:id", auth, (req, res) => {
  const appreciationId = req.params.id;
  Apprecier.update(req.body, { where: { id: appreciationId } })
    .then((_) => {
      Apprecier.findByPk(appreciationId).then((updatedAppreciation) => {
        if (updatedAppreciation === null) {
          const message = "cette appreciation n'existe pas !";
          return res.status(404).json({ message });
        }
        const message = `l'appreciation dont l'id vaut ${updatedAppreciation.id} a été mis a jour !`;
        res.json(success(message, updatedAppreciation));
      });
    })
    .catch((error) => {
      const message = " l'appreciation n'a pas pu etre mis a jour !";
      res.status.apply(500).json({ message, data: error });
    });
});
export { appreciationRouter };

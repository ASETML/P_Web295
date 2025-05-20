import express from "express";
import { auth } from "../auth/auth.mjs";
import { Apprecier } from "../db/sequelize.mjs";
import { ValidationError } from "sequelize";
import { success } from "./helper.mjs";
import { privateKey } from "../config.mjs";
import jwt from "jsonwebtoken";
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

appreciationRouter.get("/:id", auth, (req, res) => {
  const livre_fk = req.params.id;

  //Decoder le token pour récupérer l'id de l'utilisateur
  const token = req.cookies["authcookie"];
  const decodedToken = jwt.verify(token, privateKey);
  const utilisateur_fk = decodedToken.utilisateurId;

  Apprecier.findOne({
    where: { livre_fk: livre_fk, utilisateur_fk: utilisateur_fk },
  })
    .then((appreciation) => {
      if (appreciation) {
        const message = `L'appréciation de l'utilisateur ${utilisateur_fk} pour le livre ${livre_fk} a bien été récupérée`;
        return res.json(success(message, appreciation));
      }
      const message = `Il n'y a pas d'appréciation de l'utilisateur ${utilisateur_fk} pour le livre ${livre_fk}`;
      return res.status(404).json({ message });
    })
    .catch((error) => {
      const message = "L'appréciation n'a pas pu être récupérée, réessayer";
      console.log(error);
      return res.status(500).json({ message, data: error });
    });
});

appreciationRouter.post("/:id", auth, (req, res) => {
  const livre_fk = req.params.id;
  const note = req.body.note;

  //Decoder le token pour récupérer l'id de l'utilisateur
  const token = req.cookies["authcookie"];
  const decodedToken = jwt.verify(token, privateKey);
  const utilisateur_fk = decodedToken.utilisateurId;

  Apprecier.create({ livre_fk, utilisateur_fk, note })
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

import express from "express";
import { utilisateur } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { ValidationError, Op } from "sequelize";
const connexionRouter = express();

connexionRouter.post("/inscription", (req, res) => {
  utilisateur
    .create(req.body)
    .then((createdUtilisateur) => {
      const message = `l'utilisateur ${createdUtilisateur.name} a bien été créé !`;
      res.json(success(message, createdUtilisateur));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "l'utilisateur n'a pas pu se créer !";
      res.status(500).json({ message, data: error });
    });
});

connexionRouter.post("/connexion", (req, res) => {
  utilisateur
    .findOne({ where: { username: req.body.username } })
    .then(utilisateur);
});

export { connexionRouter };

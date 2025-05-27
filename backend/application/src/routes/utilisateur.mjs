import express from "express";
import { Livre, Utilisateur } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";
import jwt from "jsonwebtoken";

import { privateKey } from "../config.mjs";
import { where } from "sequelize";
const utilisateurRouter = express();

utilisateurRouter.get("/", auth, (req, res) => {
  const authorizationHeader = req.cookies["authcookie"];
  //const authorizationHeader = req.headers.authorization;
  //console.log(req.headers.authorization);
  console.log(req.cookies["authcookie"]);

  const token = authorizationHeader;
  const decodedToken = jwt.verify(token, privateKey);
  console.log(decodedToken);
  res.json(decodedToken.utilisateurId);
});
//Détails d'un utilisateur
utilisateurRouter.get("/:id", auth, (req, res) => {
  console.log(req.params.id);
  let userPreview = [];
  Utilisateur.findByPk(req.params.id)
    .then((utilisateur) => {
      console.log(utilisateur);
      if (utilisateur === null) {
        const message = `cet utilisateur n'existe pas`;
        return res.status(404).json({ message });
      }
      const message = `l'utilisateur dont l'id vaut ${utilisateur.utilisateur_id} a bien été récupérer`;

      Livre.findAll({
        where: {
          utilisateur_fk: utilisateur.utilisateur_id,
        },
      }).then((livres) => {
        console.log(message);
        console.log(livres);
        const nbrLivres = livres.length;
        console.log(nbrLivres);

        userPreview.push({
          user_id: utilisateur.utilisateur_id,
          pseudo: utilisateur.pseudo,
          date_inscription: utilisateur.created,
          nbrLivres: nbrLivres,
        });
        res.json(success(message, userPreview));
      });
    })
    .catch((error) => {
      const message = "il y a eu un problème du côté serveur désolé!!!";
      res.status(500).json({ message, data: error });
    });
});

//Modification d'un utilisateur
utilisateurRouter.put("/:id", auth, async (req, res) => {
  try {
    const utilisateurId = req.params.id;
    const { admin } = req.body;

    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    if (!utilisateur) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas." });
    }

    if (admin) {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res.status(401).json({ message: "Token manquant." });
      }

      try {
        const token = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, privateKey);
        const adminUtilisateur = await Utilisateur.findByPk(decodedToken.id);

        if (!adminUtilisateur?.admin) {
          return res.status(403).json({ message: "Action non autorisée." });
        }
      } catch (error) {
        return res.status(401).json({ message: "Token invalide." });
      }
    }

    await Utilisateur.update(req.body, { where: { id: utilisateurId } });

    const updatedUtilisateur = await Utilisateur.findByPk(utilisateurId);
    res.json(success("Utilisateur mis à jour.", updatedUtilisateur));
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", data: error.message });
  }
});

//Supression d'un utilisateur
utilisateurRouter.delete("/:id", auth, async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas." });
    }
    await Utilisateur.destroy({ where: { id: req.params.id } });
    res.json(
      success(`L'utilisateur ${utilisateur.pseudo} a été supprimé.`, {})
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression.", data: error });
  }
});

export { utilisateurRouter };

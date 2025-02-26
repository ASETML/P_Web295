/*import express from "express";
import { Utilisateur } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";
import jwt from "jsonwebtoken";
import { privateKey } from "../config.mjs";

const utilisateurRouter = express();

//Détails d'un utilisateur
utilisateurRouter.get("/:id", auth, (req, res) => {
  Utilisateur.findByPk(req.params.id)
    .then((utilisateur) => {
      if (utilisateur === null) {
        const message = `cet utilisateur n'existe pas`;
        return res.status(404).json({ message });
      }
      const message = `l'utilisateur dont l'id vaut ${utilisateur.id} a bien été récupérer`;
      res.json(success(message, utilisateur));
    })
    .catch((error) => {
      const message = "il y a eu un problème du côté serveur désolé";
      res.status(500).json({ message, data: error });
    });
});

//Modification d'un utilisateur
utilisateurRouter.put("/:id", auth, (req, res) => {
  const utilisateurId = req.params.id;
  const admin = req.body.admin;
  //
  if (admin) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      const message = `vous n'avez pas fourni de jetonssss d'authentification`;
      return res.status(401).json({ message });
    } else {
      const token = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(
        token,
        privateKey,
        (error, decodedToken) => {
          Utilisateur.findByPk(decodedToken.id).then((adminutilisateur) => {
            if (
              decodedToken.admin == adminutilisateur.admin &&
              adminutilisateur.admin === true
            ) {
              return Utilisateur.update(req.body, {
                where: { id: utilisateurId },
              }).then((updatedUtilisateur) => {
                const message = "l'utilisateur a été mis a jour";
                res.json(success(message, updatedUtilisateur));
              });
            } else {
              const message = "vous ne pouvez pas devenir admin !";
              return res.status(401).json(message);
            }
          });
        }
      );
    }
  }

  //

  if (req.body.admin === true && decodedToken.admin === false) {
    const message = `vous n'etes pas admin !`;
    return res.status(401).json(message);
  }
  Utilisateur.update(req.body, { where: { id: utilisateurId } })
    .then((_) => {
      Utilisateur.findByPk(utilisateurId).then((updatedUtilisateur) => {
        if (updatedUtilisateur === null) {
          const message = "cet utilisateur n'éxiste pas";
          return res.status(404).json({ message });
        }

        const message = `l'utilisateur ${updatedUtilisateur.name} dont l'id vaut ${updatedUtilisateur.id} a bien été mis a jour !`;
        res.json(success(message, updatedUtilisateur));
      });
    })
    .catch((error) => {
      const message = "l'utilisateur n'a pas pu etre mis a jour";
      res.status(500).json({ message, data: error });
    });
});

//Supression d'un utilisateur
utilisateurRouter.delete("/:id", auth, (req, res) => {
  Utilisateur.findByPk(req.params.id)
    .then((deletedUtilisateur) => {
      if (deletedUtilisateur === null) {
        const message = `cet utilisateur n'existe pas`;
        return res.status(404).json({ message });
      }
      return Utilisateur.destroy({
        where: { id: deletedUtilisateur.id },
      }).then((_) => {
        const message = `l'utilisateur dont l'id vaut ${deletedUtilisateur.id} a bien été supprimé`;
        res.json(success(message, utilisateur));
      });
    })
    .catch((error) => {
      const message = "il y a eu un problème du côté serveur désolé";
      res.status(500).json({ message, data: error });
    });
});

export { utilisateurRouter };*/

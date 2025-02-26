import express from "express";
import { Utilisateur } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { auth } from "../auth/auth.mjs";

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
  Utilisateur.update(req.body, { where: { id: utilisateurId } })
    .then((_) => {
      utilisateur.findByPk(utilisateurId).then((updatedUtilisateur) => {
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

export { utilisateurRouter };

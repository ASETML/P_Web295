import express from "express";
import { Utilisateur } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";
import { ValidationError, Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateKey } from "../config.mjs";
import cookieParser from "cookie-parser";

const connexionRouter = express();

connexionRouter.post("/inscription", (req, res) => {
  const mdp = req.body.mot_de_passe;
  const pseudo = req.body.pseudo;

  if (!mdp || !pseudo) {
    return res.status(400).json({
      message: "Il faut fournir un nom d'utilisateur et un mot de passe",
    });
  }
  bcrypt.hash(mdp, 10).then((hash) => {
    Utilisateur.create({ mot_de_passe: hash, pseudo: pseudo, admin: false })
      .then((createdUtilisateur) => {
        const message = `l'utilisateur ${createdUtilisateur.pseudo} a bien été créé !`;
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
});

connexionRouter.post("/connexion", async (req, res) => {
  const mdp = req.body.mot_de_passe;
  const pseudo = req.body.pseudo;

  if (!mdp || !pseudo) {
    return res.status(400).json({
      message: "Il faut fournir un nom d'utilisateur et un mot de passe",
    });
  }
  try {
    const utilisateur = await Utilisateur.findOne({
      where: { pseudo: pseudo },
    });

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur inexistant." });
    }

    const motDePasseValide = await bcrypt.compare(
      mdp,
      utilisateur.mot_de_passe
    );
    if (!motDePasseValide) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { utilisateurId: utilisateur.id, admin: utilisateur.admin },
      privateKey,
      { expiresIn: "1y" }
    );
    res.cookie("jwtCookie", token, {
      maxAge: 86400000, //24h en milisecondes
      httpOnly: true,
    });
    res.json({ message: "Connexion réussie.", token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", data: error.message });
  }
});

export { connexionRouter };

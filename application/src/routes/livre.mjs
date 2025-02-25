import express from "express";
import { Livre } from "../db/sequelize.mjs";
import { Op, where } from "sequelize";
import { success } from "./helper.mjs";

const livreRouter = express();

//Listes des livres + recherche
livreRouter.get("/", (req, res) => {
  const recherche = req.query.search;

  if (recherche) {
    Livre.findAll({ where: { titre: { [Op.like]: `%${recherche}%` } } }).then(
      (books) => {
        res.json(success("La liste des livres à bien été récupérée", books));
      }
    );
  } else {
    Livre.findAll().then((books) => {
      res.json(success("La liste des livres à bien été récupérée", books));
    });
  }
});

//Détails d'un livres

export { livreRouter };

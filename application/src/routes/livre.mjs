import express from "express";
import { Livre } from "../db/sequelize.mjs";
import { Op, where } from "sequelize";

const livreRouter = express();

//Listes des livres + recherche
livreRouter.get("/", (req, res) => {
  const recherche = req.query.search;

  if (recherche.length > 0) {
    Livre.findAll({ where: { titre: { [Op.like]: `%${recherche}%` } } }).then(
      (books) => {
        res.json({ livres: books });
      }
    );
  }

  Livre.findAll().then((books) => {
    res.json({ livres: books });
  });
});

export { livreRouter };

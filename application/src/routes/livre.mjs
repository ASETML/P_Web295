import express from "express";
import {
  Livre,
  Ecrivain,
  Editeur,
  Categorie,
  Apprecier,
} from "../db/sequelize.mjs";
import { Op, where } from "sequelize";
import { success } from "./helper.mjs";

const livreRouter = express();

//Listes des livres + recherche
livreRouter.get("/", (req, res) => {
  const recherche = req.query.search;
  let booksPreview = [];
  if (recherche) {
    Livre.findAll({ where: { titre: { [Op.like]: `%${recherche}%` } } }).then(
      (books) => {
        for (const book of books) {
          Ecrivain.findByPk(book.ecrivain_fk).then((ecrivain) => {
            let preview = {
              livre_id: book.livre_id,
              titre: book.titre,
              annee_edition: book.annee_edition,
              ecrivain_nom: ecrivain.nom,
              ecrivain_prenom: ecrivain.prenom,
            };
            console.log(preview);
            booksPreview.push(preview);
            console.log(booksPreview);
            //Marche pas, mauvais endroit
            res.json(
              success("La liste des livres à bien été récupérée", booksPreview)
            );
          });
        }
      }
    );
  } else {
    Livre.findAll().then((books) => {
      res.json(
        success("La liste de tous les livres à bien été récupérée", books)
      );
    });
  }
});

//Détails d'un livres

export { livreRouter };

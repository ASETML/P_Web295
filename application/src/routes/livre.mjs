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

//Listes des livres + recherche - marche pas
livreRouter.get("/", (req, res) => {
  const recherche = req.query.search;
  let booksPreview = [];
  let preview = {
    livre_id: null,
    titre: null,
    annee_edition: null,
    ecrivain_nom: null,
    ecrivain_prenom: null,
    editeur_nom: null,
    categorie_nom: null,
    moyenne_appreciations: null,
  };
  if (recherche) {
    Livre.findAll({
      where: { titre: { [Op.like]: `%${recherche}%` } },
    }).then((books) => {
      for (const book of books) {
        preview.livre_id = book.livre_id;
        preview.titre = book.titre;
        preview.annee_edition = book.annee_edition;

        Ecrivain.findByPk(book.ecrivain_fk).then((ecrivain) => {
          preview.ecrivain_nom = ecrivain.nom;
          preview.ecrivain_prenom = ecrivain.prenom;
        });
        Editeur.findByPk(book.editeur_fk).then((editeur) => {
          preview.editeur_nom = editeur.nom;
        });
        Categorie.findByPk(book.categorie_fk).then((categorie) => {
          preview.categorie_nom = categorie.nom;
        });
        console.log(preview);
        Apprecier.findAndCountAll({
          where: { livre_fk: { [Op.eq]: book.livre_id } },
        }).then((count, rows) => {
          let temp;
          console.log(count + " " + rows);
          for (const appreciation of rows) {
            temp += appreciation.note;
          }
          preview.moyenne_appreciations = temp / count;
        });
        booksPreview.push(preview);
      }
      res.json(
        success("La liste des livres à bien été récupérée", booksPreview)
      );
    });
  } else {
    Livre.findAll().then((books) => {
      res.json(
        success("La liste de tous les livres à bien été récupérée", books)
      );
    });
  }
});

//Détails d'un livres

//Ajout d'un livre
livreRouter.post("/", (req, res) => {
  Livre.create(req.body).then((book) => {
    res.json(success(`Le livre '${req.body.titre}' a bien été créé`, book));
  });
});
export { livreRouter };

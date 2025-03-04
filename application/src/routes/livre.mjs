import express from "express";
import { auth } from "../auth/auth.mjs";
import {
  Livre,
  Ecrivain,
  Editeur,
  Categorie,
  Apprecier,
  Commenter,
} from "../db/sequelize.mjs";
import { ValidationError, Op, where } from "sequelize";
import { success } from "./helper.mjs";

const livreRouter = express();

//Listes des livres + recherche - marche pas
livreRouter.get("/", auth, (req, res) => {
  let recherche = req.query.search;
  let categorie = req.query.cat;
  let booksPreview = [];
  let preview = {
    livre_id: null,
    titre: null,
    annee_edition: null,
    ecrivain_nom: null,
    ecrivain_prenom: null,
    categorie_nom: null,
  };
  if (!categorie) {
    categorie = "%";
  }
  if (!recherche) {
    recherche = "%";
  }

  Livre.findAll({
    where: {
      titre: { [Op.like]: `%${recherche}%` },
      categorie_fk: { [Op.like]: categorie },
    },
  }).then((books) => {
    for (const book of books) {
      preview.livre_id = book.livre_id;
      preview.titre = book.titre;
      preview.annee_edition = book.annee_edition;

      Ecrivain.findByPk(book.ecrivain_fk).then((ecrivain) => {
        preview.ecrivain_nom = ecrivain.nom;
        preview.ecrivain_prenom = ecrivain.prenom;
      });

      Categorie.findByPk(book.categorie_fk).then((categorie) => {
        preview.categorie_nom = categorie.nom;
      });
      console.log(preview);

      booksPreview.push(preview);
      preview = {
        livre_id: null,
        titre: null,
        annee_edition: null,
        ecrivain_nom: null,
        ecrivain_prenom: null,
        categorie_nom: null,
      };
    }
    res.json(success("La liste des livres à bien été récupérée", booksPreview));
  });
});
// ============================================================================
// ========================== > Détails d'un livres < =========================
// ============================================================================
livreRouter.get("/:id", (req, res) => {
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
  Livre.findAll().then((books) => {
    res.json(
      success(
        "La liste de tous les livres à bien été récupérée (il n'y a pas de recherche)",
        books
      )
    );
  });
});

// ============================================================================
// ============================================================================
// ============================================================================

//Ajout d'un livre
livreRouter.post("/", (req, res) => {
  Livre.create(req.body);
  then((book) => {
    res.json(success(`Le livre '${req.body.titre}' a bien été créé`, book));
  }).catch((error) => {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message =
      "Le livre n'a pas pu être créé. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  });
});

livreRouter.post("/:id/commentaire", (req, res) => {
  const livre_fk = req.params.id;
  const commentaire = req.body.commentaire;
  const utilisateur_fk = req.body.utilisateur_fk;
  Commenter.create({ commentaire: commentaire, livre_fk, utilisateur_fk })
    .then((commentaire) => {
      res.json(success(`Votre commentaire a été posté`, commentaire));
    })
    .catch((error) => {
      console.log(error);
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le commentaire n'a pas pu être posté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});
export { livreRouter };

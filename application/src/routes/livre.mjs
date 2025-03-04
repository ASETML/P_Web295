import express from "express";
import { auth } from "../auth/auth.mjs";
import {
  Livre,
  Ecrivain,
  Editeur,
  Categorie,
  Apprecier,
} from "../db/sequelize.mjs";
import { ValidationError, Op, where } from "sequelize";
import { success } from "./helper.mjs";

const livreRouter = express();

//Listes des livres + recherche - marche pas
livreRouter.get("/", auth, async (req, res) => {
  let recherche = req.query.search || "%"; // Si vide, ça prend la valeur "%"
  let categorie = req.query.cat || "%"; // Si vide, ça prend la valeur "%"
  let booksPreview = [];

  try {
    const books = await Livre.findAll({
      where: {
        titre: { [Op.like]: `%${recherche}%` },
        categorie_fk: { [Op.like]: categorie },
      },
    });

    for (const book of books) {
      // Récupérer l'écrivain et la catégorie pour chaque livre
      const ecrivain = await Ecrivain.findByPk(book.ecrivain_fk);
      const categorieRecup = await Categorie.findByPk(book.categorie_fk);

      // Construire l'objet preview pour chaque livre
      booksPreview.push({
        livre_id: book.livre_id,
        titre: book.titre,
        annee_edition: book.annee_edition,
        ecrivain_nom: ecrivain ? ecrivain.nom : null,
        ecrivain_prenom: ecrivain ? ecrivain.prenom : null,
        categorie_nom: categorieRecup ? categorieRecup.nom : null,
      });
    }
    res.json(success("La liste des livres à bien été récupérée", booksPreview));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
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
  Livre.create(req.body)
    .then((book) => {
      res.json(success(`Le livre '${req.body.titre}' a bien été créé`, book));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le livre n'a pas pu être créé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});
export { livreRouter };

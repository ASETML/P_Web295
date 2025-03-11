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
import Sequelize from "sequelize";

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
      const ecrivain = await Ecrivain.findByPk(book.ecrivain_fk);
      const categorieRecup = await Categorie.findByPk(book.categorie_fk);
      const editeur = await Editeur.findByPk(book.editeur_fk);

      //  moyenne appréciations du livre
      const moyenneAppreciation = await Apprecier.findOne({
        where: { livre_fk: book.livre_id },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("note")), "moyenne"]],
        raw: true,
      });

      // objet preview pour chaque livre (correspondant à la recherche)
      booksPreview.push({
        livre_id: book.livre_id,
        titre: book.titre,
        annee_edition: book.annee_edition,
        ecrivain_nom: ecrivain ? ecrivain.nom : null,
        ecrivain_prenom: ecrivain ? ecrivain.prenom : null,
        categorie_nom: categorieRecup ? categorieRecup.nom : null,
        editeur_nom: editeur ? editeur.nom : null,
        moyenne_appreciation: moyenneAppreciation
          ? parseFloat(moyenneAppreciation.moyenne).toFixed(2)
          : null,
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
livreRouter.get("/:id", auth, async (req, res) => {
  try {
    const book = await Livre.findByPk(req.params.id);

    // Récupérer l'écrivain et la catégorie pour chaque livre
    const ecrivain = await Ecrivain.findByPk(book.ecrivain_fk);
    const categorieRecup = await Categorie.findByPk(book.categorie_fk);
    const editeur = await Editeur.findByPk(book.editeur_fk);
    // =============================================================================================== MOYENNE DES APPRECIATIONS
    const commentaires = await Commenter.findAll({
      where: { livre_fk: { [Op.eq]: req.params.id } },
    });

    // Construire l'objet preview pour chaque livre
    const preview = {
      livre_id: book.livre_id,
      titre: book.titre,
      annee_edition: book.annee_edition,
      extrait: book.extrait,
      ecrivain_nom: ecrivain ? ecrivain.nom : null,
      ecrivain_prenom: ecrivain ? ecrivain.prenom : null,
      categorie_nom: categorieRecup ? categorieRecup.nom : null,
      editeur_nom: editeur ? editeur.nom : null,
      commentaires: commentaires ? commentaires : null,
    };

    res.json(success("La liste des livres à bien été récupérée", preview));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
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

//Poste un commentaire
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

//Suprimme un livre
livreRouter.delete("/:id", auth, (req, res) => {
  Livre.findByPk(req.params.id)
    .then((livre) => {
      if (livre === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      //Suppression du produit
      return Livre.destroy({
        where: { livre_id: livre.livre_id },
      }).then((_) => {
        const message = `Le livre ${livre.titre} a bien été supprimé !`;
        res.json(success(message, livre));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Modifie un livre
livreRouter.put("/:id", auth, (req, res) => {
  Livre.update(req.body, { where: { livre_id: req.params.id } })
    .then((_) => {
      return Livre.findByPk(req.params.id).then((livre) => {
        //Livre existe pas
        if (livre === null) {
          const message =
            "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        //Livre existe
        const message = `Le livre ${livre.titre} dont l'id vaut ${livre.livre_id} a été mis à jour avec succès`;
        res.json(success(message, livre));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { livreRouter };

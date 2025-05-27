import express from "express";
import { auth } from "../auth/auth.mjs";
import {
  Livre,
  Ecrivain,
  Editeur,
  Categorie,
  Apprecier,
  Commenter,
  Utilisateur,
} from "../db/sequelize.mjs";
import { ValidationError, Op, where } from "sequelize";
import { success } from "./helper.mjs";
import Sequelize from "sequelize";
import { privateKey } from "../config.mjs";
import jwt from "jsonwebtoken";

//Stockage des images
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const livreRouter = express();
/**
 * @swagger
 * /api/livres/:
 *   get:
 *     tags: [Livres]
 *     security:
 *       - bearerAuth: []
 *     summary: Récupérer la liste des livres par catégorie.
 *     description: Retourne une liste des livres appartenant à une catégorie spécifique et correspondant à une recherche donnée.
 *     parameters:
 *       - in: query
 *         name: cat
 *         schema:
 *           type: integer
 *         description: Identifiant de la catégorie.
 *         example: 3
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Mot-clé pour la recherche de titres de livres.
 *         example: Harry Potter
 *     responses:
 *       200:
 *         description: La liste des livres a été récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: La liste des livres a bien été récupérée
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       livre_id:
 *                         type: integer
 *                         description: L'identifiant du livre.
 *                         example: 1
 *                       titre:
 *                         type: string
 *                         description: Le titre du livre.
 *                         example: Harry Potter et la pierre philosophale
 *                       annee_edition:
 *                         type: integer
 *                         description: Année d'édition du livre.
 *                         example: 1997
 *                       ecrivain_nom:
 *                         type: string
 *                         description: Nom de l'écrivain.
 *                         example: Rowling
 *                       ecrivain_prenom:
 *                         type: string
 *                         description: Prénom de l'écrivain.
 *                         example: J.K.
 *                       categorie_nom:
 *                         type: string
 *                         description: Nom de la catégorie du livre.
 *                         example: Fantasy
 *                       editeur_nom:
 *                         type: string
 *                         description: Nom de l'éditeur.
 *                         example: Gallimard
 *                       moyenne_appreciation:
 *                         type: number
 *                         format: float
 *                         description: Moyenne des appréciations du livre.
 *                         example: 4.5
 *       401:
 *         description: Non autorisé, jeton JWT invalide ou manquant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Accès refusé. Token manquant ou invalide.
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Une erreur est survenue sur le serveur.
 */
livreRouter.get("/", async (req, res) => {
  let recherche = req.query.search || "%"; // Si vide, ça prend la valeur "%"
  let categorie = req.query.cat || "%"; // Si vide, ça prend la valeur "%"
  let limit = parseInt(req.query.limit) || 5; //La limite spécifiée par l'utilisateur ou 5
  let user = req.query.user || "%";
  let booksPreview = [];
  console.log(user);
  console.log(req.query.user);
  try {
    let books;
    //Tous les livres
    if (limit == -1) {
      books = await Livre.findAll({
        where: {
          titre: { [Op.like]: `%${recherche}%` },
          categorie_fk: { [Op.like]: categorie },
          utilisateur_fk: { [Op.like]: user },
        },
      });
    } else {
      books = await Livre.findAll({
        where: {
          titre: { [Op.like]: `%${recherche}%` },
          categorie_fk: { [Op.like]: categorie },
          utilisateur_fk: { [Op.like]: user },
        },
        limit: limit,
      });
    }

    for (const book of books) {
      const ecrivain = await Ecrivain.findByPk(book.ecrivain_fk);
      const categorieRecup = await Categorie.findByPk(book.categorie_fk);
      const editeur = await Editeur.findByPk(book.editeur_fk);
      const utilisateur_fk = await Utilisateur.findByPk(book.utilisateur_fk);

      //  moyenne appréciations du livre
      const moyenneAppreciations = await Apprecier.findOne({
        where: { livre_fk: book.livre_id },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("note")), "moyenne"]],
        raw: true,
      });

      // objet preview pour chaque livre (correspondant à la recherche)
      booksPreview.push({
        livre_id: book.livre_id,
        titre: book.titre,
        annee_edition: book.annee_edition,
        image: book.image,
        ecrivain_nom: ecrivain ? ecrivain.nom : null,
        ecrivain_prenom: ecrivain ? ecrivain.prenom : null,
        categorie_nom: categorieRecup ? categorieRecup.nom : null,
        editeur_nom: editeur ? editeur.nom : null,
        utilisateur_fk: utilisateur_fk ? utilisateur_fk.utilisateur_id : null,
        moyenne_appreciation: moyenneAppreciations
          ? parseFloat(moyenneAppreciations.moyenne).toFixed(2)
          : null,
        categorie_fk: book.categorie_fk,
        created: book.created,
      });
    }

    //Sort books
    booksPreview.sort((x, y) => x.created > y.created);

    res.json(success("La liste des livres à bien été récupérée", booksPreview));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
livreRouter.get("/commentaire/:id", auth, async (req, res) => {
  try {
    const commentaires = await Commenter.findAll({
      where: {
        utilisateur_fk: req.params.id,
      },
    });
    if (commentaires) {
      res.json(
        success(
          `voici les commentaires de l'utilisateur dont l'id vaut ${req.params.id}`,
          commentaires
        )
      );
    } else {
      res.status(404).json("utilisateur non trouvé");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//Détails d'un livre
livreRouter.get("/:id", async (req, res) => {
  try {
    const book = await Livre.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Aucun livre trouvé avec l'ID ${req.params.id}.`,
      });
    }

    // Récupérer l'écrivain et la catégorie pour chaque livre
    const ecrivain = await Ecrivain.findByPk(book.ecrivain_fk);
    const categorieRecup = await Categorie.findByPk(book.categorie_fk);
    const editeur = await Editeur.findByPk(book.editeur_fk);

    //  moyenne appréciations du livre
    const moyenneAppreciations = await Apprecier.findOne({
      where: { livre_fk: book.livre_id },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("note")), "moyenne"]],
      raw: true,
    });

    const commentaires = await Commenter.findAll({
      where: { livre_fk: { [Op.eq]: req.params.id } },
    });

    // Construire l'objet preview pour chaque livre
    const preview = {
      livre_id: book.livre_id,
      titre: book.titre,
      nb_pages: book.nombre_pages,
      annee_edition: book.annee_edition,
      extrait: book.extrait,
      resume: book.resume,
      image: book.image,
      ecrivain_nom: ecrivain ? ecrivain.nom : null,
      ecrivain_prenom: ecrivain ? ecrivain.prenom : null,
      categorie_nom: categorieRecup ? categorieRecup.nom : null,
      editeur_nom: editeur ? editeur.nom : null,
      commentaires: commentaires ? commentaires : null,
      //Moyenne appréciations
      moyenne_appreciations: moyenneAppreciations
        ? parseFloat(moyenneAppreciations.moyenne).toFixed(2)
        : null,
    };

    res.json(
      success(
        `Le livre qui a l'id ${req.params.id} a bien été récupéré : `,
        preview
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//Ajout d'un livre
livreRouter.post("/", auth, upload.single("file"), (req, res) => {
  let object;

  try {
    //Récupération du json de la requête
    object = JSON.parse(req.body.data);
  } catch (error) {
    const message =
      "Le livre n'a pas pu être créé. Merci de réessayer dans quelques instants. Il faut envoyer les données dans un formulaire multipart, et le json dans un champ data";
    console.log(error);
    return res.status(400).json({ message, data: error });
  }
  console.log(object);
  //Création de l'objet livre avec l'image
  const livre = { ...object, image: req.file.filename };
  console.log(req.file.filename);
  console.log(livre);
  Livre.create(livre)
    .then((book) => {
      console.log(book);
      res.json(success(`Le livre '${livre.titre}' a bien été créé`, book));
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
livreRouter.post("/:id/commentaire", auth, (req, res) => {
  const livre_fk = req.params.id;
  const commentaire = req.body.commentaire;

  //Decoder le token pour récupérer l'id de l'utilisateur
  const token = req.cookies["authcookie"];
  const decodedToken = jwt.verify(token, privateKey);
  const utilisateur_fk = decodedToken.utilisateurId;

  console.log(livre_fk, commentaire, utilisateur_fk, decodedToken);
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
livreRouter.put("/:id", upload.single("file"), auth, (req, res) => {
  let object;
  try {
    //Récupération du json de la requête
    object = JSON.parse(req.body.data);
  } catch {
    const message =
      "Le livre n'a pas pu être créé. Merci de réessayer dans quelques instants. Il faut envoyer les données dans un formulaire multipart, et le json dans un champ data";
    return res.status(400).json({ message, data: error });
  }
  //Création de l'objet livre avec l'image
  const livreObj = { ...object, image: req.file.filename };
  Livre.update(livreObj, { where: { livre_id: req.params.id } })
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

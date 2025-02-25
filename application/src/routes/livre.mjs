import express from "express";
import { auth } from "../auth/auth.mjs";
const livreRouter = express();

//Liste des livres
livreRouter.get("/", auth, (req, res) => {});

//Détails d'un livre
livreRouter.get("/:id", auth, (req, res) => {});

//Modification d'un livre
livreRouter.put("/:id", auth, (req, res) => {});

//Supression d'un livre
livreRouter.delete("/:id", auth, (req, res) => {});

//Ajout d'un livre
livreRouter.post("/", auth, (req, res) => {});

//Livres d'un utilisateurs
livreRouter.get("/", auth, (req, res) => {});

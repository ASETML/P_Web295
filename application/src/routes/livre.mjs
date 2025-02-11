import express from "express";

const livreRouter = express();

//Liste des livres
livreRouter.get("/", (req, res) => {});

//Détails d'un livre
livreRouter.get("/:id", (req, res) => {});

//Modification d'un livre
livreRouter.put("/:id", (req, res) => {});

//Supression d'un livre
livreRouter.delete("/:id", (req, res) => {});

//Ajout d'un livre
livreRouter.post("/", (req, res) => {});

//Livres d'un utilisateurs
livreRouter.get("/", (req, res) => {});

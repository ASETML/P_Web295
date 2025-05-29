import express from "express";
import { app_port } from "./config.mjs";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();

/*app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});*/
const corsOptions = {
  origin: true, // Autorise ton frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Autorise le header Authorization
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Pour récupérer les images
app.use("/uploads", express.static("uploads"));

const port = app_port;

//Connection à la DB
import { sequelize, initDb } from "./db/sequelize.mjs";
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie"),
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));
initDb(); //Ajout des données

//Route pour la racine
app.get("/", (req, res) => {
  res.send("API REST de Passion Lecture !");
});

import { livreRouter } from "./routes/livre.mjs";
app.use("/api/livres", livreRouter);

import { utilisateurRouter } from "./routes/utilisateur.mjs";
app.use("/api/utilisateur", utilisateurRouter);

import { categorieRouter } from "./routes/categorie.mjs";
app.use("/api/categories", categorieRouter);

import { appreciationRouter } from "./routes/appreciation.mjs";
app.use("/api/appreciations", appreciationRouter);

import { connexionRouter } from "./routes/connexion.mjs";
app.use("/api", connexionRouter);

import { ecrivainRouter } from "./routes/ecrivain.mjs";
app.use("/api/ecrivains", ecrivainRouter);

import { editeurRouter } from "./routes/editeur.mjs";
app.use("/api/editeurs", editeurRouter);

//Route pour /api/
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

import { swaggerSpec } from "./swagger.mjs";
// Route pour accéder à la documentation Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true }),
);

//Middleware
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

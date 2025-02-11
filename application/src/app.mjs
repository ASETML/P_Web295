import express from "express";
import { app_port } from "./config.mjs";

const app = express();

app.use(express.json());

const port = app_port;

//Connection à la DB
import { sequelize, initDb } from "./db/sequelize.mjs";
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));
initDb(); //Ajout des données

//Route pour la racine
app.get("/", (req, res) => {
  res.send("API REST de Passion Lecture !");
});

//Route pour /api/
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

//Middleware
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

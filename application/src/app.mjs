import express from "express";
import { app_port } from "./config.mjs";
import swaggerUi from "swagger-ui-express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier n'a été reçu." });
  }

  res.json({ message: "Youpi" });
  // Access the uploaded file using req.file
  // Process the file and send a response
});
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

import { livreRouter } from "./routes/livre.mjs";
app.use("/api/livre", livreRouter);

/*import { utilisateurRouter } from "./routes/utilisateur.mjs";
app.use("/api/utilisateur", utilisateurRouter);*/

import { categorieRouter } from "./routes/categorie.mjs";
app.use("/api/categorie", categorieRouter);

import { appreciationRouter } from "./routes/appreciation.mjs";
app.use("/api/appreciation", appreciationRouter);

import { connexionRouter } from "./routes/connexion.mjs";
app.use("/api", connexionRouter);

import { ecrivainRouter } from "./routes/ecrivain.mjs";
app.use("/api/ecrivain", ecrivainRouter);

import { editeurRouter } from "./routes/editeur.mjs";
app.use("/api/editeur", editeurRouter);

//Route pour /api/
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

import { swaggerSpec } from "./swagger.mjs";
// Route pour accéder à la documentation Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
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

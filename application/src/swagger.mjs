import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API self-service-machine",
      version: "1.0.0",
      description:
        "API REST permettant de gérer l'application self-serice-machine",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Livre: {
          type: "object",
          required: [
            "titre",
            "nombres_pages",
            "extrait",
            "resume",
            "annee_edition",
            "image",
            "utilisateur_fk",
            "categorie_fk",
            "editeur_fk",
            "ecrivain_fk",
          ],
          properties: {
            livre_id: {
              type: "integer",
              description: "L'identifiant unique du livre",
            },
            titre: {
              type: "string",
              description: "Le titre du livre",
            },
            nombre_pages: {
              type: "integer",
              description: "Le nombre de pages du livre",
            },
            extrait: {
              type: "string",
              description: "Le lien de l'extrait du livre",
            },
            resume: {
              type: "string",
              description: "Un cours résumé du livre",
            },
            annee_edition: {
              type: "string",
              description: "L'année d'édition du livre",
            },
            utilisateur_fk: {
              type: "integer",
              description: "L'utilisateur qui a proposé le livre",
            },
            categorie_fk: {
              type: "integer",
              description: "La catégorie du livre",
            },
            editeur_fk: {
              type: "integer",
              description: "L'éditeur du livre",
            },
            ecrivain_fk: {
              type: "integer",
              description: "L'auteur du livre",
            },

            created: {
              type: "string",
              format: "data-time",
              description: "la date et l'heure de l'ajout d'un produit",
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.mjs"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };

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
        },
        Teacher: {
          type: "object",
          required: ["name", "price", "created"],
          properties: {
            id: {
              type: "integer",
              description: "l'identifiant unique du produit",
            },
            name: {
              type: "string",
              description: "le nom du produit",
            },
            price: {
              type: "float",
              description: " le prix du produit",
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
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };

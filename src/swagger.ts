import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Konfigurasi untuk Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API untuk mengelola pengguna (CRUD)",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Nama pengguna",
            },
            email: {
              type: "string",
              description: "Email pengguna",
            },
            age: {
              type: "number",
              description: "Umur pengguna",
            },
          },
          required: ["name", "email", "age"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Menunjuk ke file routes yang akan didokumentasikan
};

// Membuat Swagger spec
const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  // Setup route untuk mengakses Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

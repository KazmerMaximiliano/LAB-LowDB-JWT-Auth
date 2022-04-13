import "dotenv/config";
import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import authRoutes from "./routes/auth.js";

const app = express();

app.set("port", process.env.PORT || 3000);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LowDB JWT Auth",
      version: "1.0.0",
      description: "JWT-based authentication with lowdb",
    },
    servers: [
      {
        url: "http://localhost:" + app.get("port"),
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(express.json());
app.use(morgan("dev"));
app.use("/", swaggerUI.serve, swaggerUI.setup(specs));

app.use(authRoutes);

export { app };

import "module-alias/register";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import { logError, logRequest } from "./middleware/loggerMiddleware";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();
app.use(cors());
app.use(express.json());

setupSwagger(app);

// Logging setiap request
app.use(logRequest);

// Menggunakan routes untuk user
app.use(userRoutes);

// Redirect root URL to /api-docs/
app.get("/", (req: Request, res: Response) => {
  res.redirect("/api-docs/");
});

// Error handling middleware
app.use(logError);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export { app, server }; // Ekspor app dan server untuk digunakan dalam pengujian

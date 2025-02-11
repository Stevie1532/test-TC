import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import { connectDB } from "./config/db.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(PORT, () => {
  connectDB;
  console.log(`Server is running on port ${PORT}`);
});

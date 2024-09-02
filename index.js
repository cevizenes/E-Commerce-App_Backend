import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

connectDB();

app.use("/api/v1", testRoutes);
app.use("/api/v1/user", userRoutes);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.bgMagenta.white);
});

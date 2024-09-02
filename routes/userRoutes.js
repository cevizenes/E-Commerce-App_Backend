import express from "express";
import { registerController } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerController);
export default router;

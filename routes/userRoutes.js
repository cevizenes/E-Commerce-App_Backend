import express from "express";
import { registerController } from "../controllers/userController.js";
import { loginController } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);
export default router;

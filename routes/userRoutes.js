import express from "express";
import { registerController } from "../controllers/userController.js";
import { loginController } from "../controllers/userController.js";
import { logoutController } from "../controllers/userController.js";
import { getUserProfileController } from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/profile", isAuth, getUserProfileController);

router.get("/logout", logoutController);
export default router;

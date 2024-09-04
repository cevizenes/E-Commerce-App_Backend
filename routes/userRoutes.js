import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  getUserProfileController,
  updateUserProfileController,
  updateUserPasswordController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", logoutController);

router.put("/update-profile", isAuth, updateUserProfileController);
router.put("/update-password", isAuth, updateUserPasswordController);
export default router;

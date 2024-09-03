import JWT from "jsonwebtoken";
import { userModel } from "../models/User.js";
export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized",
      success: false,
    });
  }

  const decodeData = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodeData.id);
  next();
};

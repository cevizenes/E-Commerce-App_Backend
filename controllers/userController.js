import { userModel } from "../models/User.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country } = req.body;
    if (!name || !email || !password || !address || !city || !country) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
    });
    res.status(201).send({
      success: true,
      message: "Register is Success",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error api",
      error: `error = ${error}`,
    });
  }
};

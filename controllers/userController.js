import { userModel } from "../models/User.js";

export const registerController = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, address, city, country, phone } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone
    ) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await userModel.create({
      name: name,
      email: email,
      password: password,
      address: address,
      city: city,
      country: country,
      phone: phone,
    });
    res.status(201).send({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: "User registration failed",
      success: false,
      error: error.message,
    });
  }
};

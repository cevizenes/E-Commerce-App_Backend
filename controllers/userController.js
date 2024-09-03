import { userModel } from "../models/User.js";

export const registerController = async (req, res) => {
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

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({
        message: "Email already exists",
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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(500).send({
        message: "Invalid credentials",
        success: false,
      });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(500).send({
        message: "Invalid credentials",
        success: false,
      });
    }
    const token = user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        message: "User logged in successfully",
        success: true,
        token,
        user,
      });
  } catch (error) {
    res.status(500).send({
      message: "User login failed",
      success: false,
      error: error.message,
    });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      message: "User profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "User profile fetch failed",
      success: false,
      error: req.user._id,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        message: "User logged out successfully",
        success: true,
      });
  } catch (error) {
    res.status(500).send({
      message: "User logout failed",
      success: false,
      error: error.message,
    });
  }
};

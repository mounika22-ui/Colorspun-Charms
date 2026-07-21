import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    console.log("========== REGISTER API ==========");
    console.log("Request Body:", req.body);

    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });

    console.log("User Saved Successfully:", user);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    console.log("Registration Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
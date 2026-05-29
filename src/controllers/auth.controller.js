const usermodel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklist.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

async function registerUsercontroller(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const isUserExist = await usermodel.findOne({
      $or: [{ email }, { username }]
    });

    if (isUserExist) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await usermodel.create({
      username,
      email,
      password: hashedPassword
    });


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}


async function loginUsercontroller(req, res) {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }


    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function logoutUsercontroller(req, res) {   
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "No token provided"
      });
    }
    await blacklistTokenModel.create({ token });


    res.clearCookie("token");

    res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getMeUsercontroller(req, res) {
  try {
    const user = req.user;

    res.status(200).json({
      message: "User details retrieved successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  registerUsercontroller,
  loginUsercontroller,
  logoutUsercontroller,
  getMeUsercontroller
};

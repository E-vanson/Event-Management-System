import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken.js";
//implement login func
//verify credentials 
//generate token
//send token as response

export const register = async (req, res) => {
  try {
    const { firstName, lastName, gender, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      console.log(`User account with email ${email} already exists`);
      return res.status(400).json({
        message: `User account with email ${email} already exists`,
      });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender,
      gender,
      password: hashedPassword,
      role: "admin",
    });
    console.log("User created:", newUser);
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error creating user: ", err);
    return res.status(500).json({
      message: "Error creating user:!! ",
      error: err.message,
    });
  }
};

export const login = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {            
            return res.status(400).json({
              message: `User does not exist`,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(403).json({ message: "Invalid Credentials" });
        }

        generateToken(res, user.id);
        res.status(200).json({ user:user });
    } catch (error) {
        return res.status(500).json({
          message: "Login Error!! ",
          error: error.message
        });
    }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


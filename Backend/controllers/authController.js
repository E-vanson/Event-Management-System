import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken.js";
//implement login func
//verify credentials 
//generate token
//send token as response


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


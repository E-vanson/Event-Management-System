import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: "admin",        
      }); 
    console.log("User created:", user );
    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });

    } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
    }
}
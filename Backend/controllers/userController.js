import User from '../models/users.js';

export const createUser = async (req, res) => {
  try {
      console.log("Inside the creater of users", User)
      const user = await User.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "securepassword",
        role: "admin",        
      });
    
    
    console.log("User created:", user.toJSON());
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
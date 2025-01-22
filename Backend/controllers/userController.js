import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
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
      return res.status(400).json({
        message: `User account with email ${email} already exists`,
      });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender, gender,
      password: hashedPassword,
      role: "admin",
    }); 
    
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
    } catch (err) {
    return res.status(500).json({
      message: "Error creating user:!! ",
      error: err.message,
    });
    }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length > 0) {
      return res.status(200).json({ users: users });
    } else {
      return res.status(200).json({ message: "No Users Found" ,users: users });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error Fetching users!!: ",
      error: err.message,
    });
  }
}

export const updateUser = async (req, res) => {
  const { id, update } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      console.log("User doesn't exist: ")
      return res.status(400).json({
        message: `User to be updated does not exist`,
      });
    }
    await user.update(update);
    console.log("User updated successfully");
    return res.status(200).json({ message: "User updated Successfully", user: user });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating user!!: ",
      error: err.message,
    });
  }
}


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      console.log("User Not Found: ");
      return res.status(400).json({
        message: `User to be deleted not found`,
      });
    }
    // Delete the user
    await user.destroy();
    console.log("User deleted successfully");
    return res
      .status(200)
      .json({ message: "User deleted Successfully"});
  } catch (error) {
    return res.status(500).json({
      message: "Error Deleting User!!: ",
      error: error.message,
    });
  }
}
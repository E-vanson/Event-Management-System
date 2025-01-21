import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });    
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "none",
    //   maxAge: 1 * 60 * 60 * 1000,
    // });

    return token ;
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;

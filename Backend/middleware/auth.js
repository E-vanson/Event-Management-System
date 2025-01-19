import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const verifyToken = (roles) => {
    return async (req, res, next) => {
        let token;
        token = req.cookies.jwt;
        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.userId, {
             attributes: ["role"],
            });
            const userRole = user ? user.role : null;
            if (user && roles.includes(userRole)) {
              next();
            } else {
              return res.status(401).send("Forbidden");
            }
          } catch (error) {
            return res.status(401).send("Not Authorized");
          }
        } else {
          return res.status(401).send("Not Authorized, No Token");
        }
    }
};

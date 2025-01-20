import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { error } from 'console';

import userRoutes from '../Backend/routes/userRoutes.js'
import { sequelizer } from './config/db.js';

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/user", userRoutes);   
//set directory of where we store files
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const port = process.env.PORT || 3000;

const connectToDb = async () => {
    await sequelizer
      .authenticate()
      .then(() => console.log("Database connected successfully."))
        .catch((err) => console.error("Unable to connect to the database:", err));
    
    //run this once during the initialization of your app
     await sequelizer
       .sync({ force: true }) // Set force: true to recreate the tables every time
       .then(() => {
         console.log("Database synced successfully");
       })
       .catch((err) => {
         console.error("Error syncing the database:", err);
       }); 
}


const startServer = async () => {
  try {
    await connectToDb()   
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`); 
    });
  } catch (error) {
    console.log(`${error} did not connect`);
  }
};

startServer();




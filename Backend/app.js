import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import { v4 as uuidv4 } from "uuid"
import cookieParser from "cookie-parser";


import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { createEvent, updateEvent } from './controllers/eventsController.js';
import userRoutes from '../Backend/routes/userRoutes.js';
import authRoutes from '../Backend/routes/authRoutes.js';
import eventRoutes from '../Backend/routes/eventRoutes.js';
import { sequelizer } from './config/db.js';

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
const allowedOrigin = "http://localhost:5173";
app.use(cors({origin: allowedOrigin, credentials: true, }));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        uuidv4() +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });


app.post("/event/createEvent", upload.single('image'), createEvent)
app.put("/event/updateEvent/:id", upload.single("image"), updateEvent);
app.use("/user", userRoutes);   
app.use("/auth", authRoutes);
app.use("/event", eventRoutes);



const port = process.env.PORT || 3000;

const connectToDb = async () => {
  await sequelizer
    .authenticate()
    .then(() => console.log("Database connected successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));

  // run this once during the initialization of your app
   /* await sequelizer
      .sync({ force: false }) // Set force: true to recreate the tables every time
      .then(() => {
        console.log("Database synced successfully");
      })
      .catch((err) => {
        console.error("Error syncing the database:", err);
      });

   await sequelizer.sync({ alter: true });*/
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




import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Import controllers and routes
import { createEvent, updateEvent,getEventById } from "./controllers/eventsController.js";
import userRoutes from "../Backend/routes/userRoutes.js";
import authRoutes from "../Backend/routes/authRoutes.js";
import eventRoutes from "../Backend/routes/eventRoutes.js";
import { getUserById } from "./controllers/userController.js";

import { sequelizer } from "./config/db.js";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());

// General CORS configuration for API routes
const allowedOrigin = "http://localhost:5173"; // Frontend's origin
app.use(
  cors({
    origin: allowedOrigin, // Allow requests from your frontend
    credentials: true, // Allow credentials (e.g., cookies)
  })
);

// Set security headers using helmet
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

// Body Parser Configuration
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

// CORS for static assets (images)
app.use("/assets", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin to access assets
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS"); // Allow only GET and OPTIONS methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Cross-Origin-Resource-Policy", "cross-origin"); // Allow cross-origin requests for resources
  next();
});

// Static file serving
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // Store images in the "public/assets" directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        uuidv4() +
        "-" +
        Date.now() +
        path.extname(file.originalname) // Generate a unique filename
    );
  },
});

const upload = multer({ storage });

// Routes
app.get('getUserByid', getUserById);
app.post("/event/createEvent", upload.single("image"), createEvent);
app.put("/event/updateEvent/:id", upload.single("image"), updateEvent);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/event", eventRoutes);
app.get('/getEventById/:id', getEventById);


// Database connection and server startup
const port = process.env.PORT || 3000;

const connectToDb = async () => {
  try {
    await sequelizer.authenticate();
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(`${error} did not connect`);
  }
};

startServer();

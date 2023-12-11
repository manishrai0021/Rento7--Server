import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';


import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import Post from "./models/post.js";
import { posts } from "./data/index.js";

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// PORT
const PORT = process.env.PORT || 5001;
const URL = process.env.URL;

// File Storage
const storage = multer.diskStorage({
  destination: function( req, file, cb ){
      cb(null, "public/assets");
  },
  filename: function ( req, file, cb ) {
      cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Route with Files
app.post("/auth/register", upload.single("video"), register);
app.post("/posts", upload.single("video"), createPost);
// app.post("/posts", verifyToken, upload.single("video"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

mongoose.connect(URL,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .then(()=> {
   app.listen(PORT, () => console.log(`Server on ${PORT}`));
  //  Post.insertMany(posts);
 })
 .catch((error) => console.log(`${error} did not connect`));
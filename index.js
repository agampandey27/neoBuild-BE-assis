import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongoDB/connectDB.js';
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Resume Analysis API Running");  
});

const startServer = async () => {
    try {
      connectDB(process.env.MONGO_URI);
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();

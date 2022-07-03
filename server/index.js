import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

//router
import petRoutes from "./routes/pets.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "30mb", extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());

app.use("/pets", express.static("storage/images"), petRoutes);
app.use("/", authRoutes);

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}` )))
    .catch((error) => console.log(error.message));



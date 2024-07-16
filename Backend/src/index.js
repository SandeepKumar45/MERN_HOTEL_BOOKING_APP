import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/dbConnection.js";
import userRouter from "./routes/userRouter.js"
import myHotelsRouter from "./routes/myHotelsRouter.js"
import hotelsRouter from "./routes/hotelsRouter.js"
import myBookingsRouter from "./routes/myBookingsRouter.js"
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from 'url';
import {v2 as cloudinary} from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


connectDB()

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET,PUT,POST,DELETE"],
    credentials: true
}))


app.use(express.static(path.join(__dirname, "../../Frontend/dist")));


app.get('/', (req,res) => {
    res.json({message: "Hello Babuni"})
})
app.use("/api/user", userRouter)
app.use("/api/my-hotels", myHotelsRouter)
app.use("/api/hotels",hotelsRouter)
app.use("/api/my-bookings",myBookingsRouter);


app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
  });

app.listen(5000,() => {
    console.log("Server running at port 5000");
})
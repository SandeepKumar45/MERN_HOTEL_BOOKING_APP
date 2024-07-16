import express from "express";
import verifyToken from "../middleware/auth.middleware.js";
import { myBookings } from "../controllers/myBookings.controller.js";

const router = express.Router();

router.route('/').get(verifyToken,myBookings)

export default router

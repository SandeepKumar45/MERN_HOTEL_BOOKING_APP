import express from "express";
import { param } from "express-validator";
import { createPaymentIntent, fetchHotelById, fetchHotels, saveBookingInfo, searchHotel } from "../controllers/hotels.controller.js";
import verifyToken from "../middleware/auth.middleware.js";


const router = express.Router();

router.route("/").get(fetchHotels)
router.route("/search").get(searchHotel)
router.route("/:id").get([param("id").notEmpty().withMessage("Hotel ID is required")],fetchHotelById)
router.route("/:hotelId/bookings/payment-intent").post(verifyToken,createPaymentIntent)
router.route("/:hotelId/bookings").post(verifyToken,saveBookingInfo)


export default router

import multer from "multer";
import verifyToken from "../middleware/auth.middleware.js";
import router from "./userRouter.js";
import { body } from "express-validator";
import { addHotel, editHotelById, viewHotelById, viewHotels } from "../controllers/myHotel.controller.js";


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});


router.route("/").post(verifyToken,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight")
          .notEmpty()
          .isNumeric()
          .withMessage("Price per night is required and must be a number"),
        body("facilities")
          .notEmpty()
          .isArray()
          .withMessage("Facilities are required"),
      ],
      upload.array("imageFiles", 6),
      addHotel    
)

router.route("/").get(verifyToken,viewHotels)


router.route("/:id").get(verifyToken,viewHotelById)


router.route("/:hotelId").put(verifyToken,upload.array("imageFiles"),editHotelById)


export default router
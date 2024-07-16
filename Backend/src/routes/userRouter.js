import { Router } from "express";
import { getUserDetails, login, logout, register, validateToken } from "../controllers/user.controller.js";
import { check } from "express-validator"
import verifyToken from "../middleware/auth.middleware.js";


const router = Router()

router.route("/me").get(verifyToken,getUserDetails)

router.route("/register").post([
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
], register);

router.route("/login").post([
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
], login)

router.route("/logout").post(logout);

router.route("/validate-token").get(verifyToken,validateToken)


export default router
import express from "express";
import { register, login } from "../controllers/auth.js";
import { checkUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

export default router;
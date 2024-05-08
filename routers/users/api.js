import express from "express";
// handlers===================
import { login } from "./controller.js";

// routes ====================
const router = express.Router();
router.route("/login").post(login);

export default router;

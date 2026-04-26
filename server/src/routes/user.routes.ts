import { Router } from "express";
import {
    getUsers,
    registerUser,
    loginUser
} from "../controllers/user.controller.js";

export const userRoutes = Router();

// existing
userRoutes.get("/", getUsers);

// NEW
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
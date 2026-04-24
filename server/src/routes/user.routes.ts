import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.get("/", getUsers);
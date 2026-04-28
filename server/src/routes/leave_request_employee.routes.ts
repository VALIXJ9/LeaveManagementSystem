import { Router } from "express";
import {
    createLeaveRequest,
    getUserLeaves
} from "../controllers/leave_request_employee.controller.js";

export const leaveRoutes = Router();

leaveRoutes.post("/", createLeaveRequest);
leaveRoutes.get("/:userId", getUserLeaves);
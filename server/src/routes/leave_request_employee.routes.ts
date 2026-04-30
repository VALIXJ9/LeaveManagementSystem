import { Router } from "express";
import {
    createLeaveRequest, deleteLeaveRequest, getAllLeaves,
    getUserLeaves, updateLeaveStatus
} from "../controllers/leave_request_employee.controller.js";

export const leaveRoutes = Router();

leaveRoutes.post("/", createLeaveRequest);
leaveRoutes.get("/", getAllLeaves);
leaveRoutes.get("/:userId", getUserLeaves);
leaveRoutes.put("/:id", updateLeaveStatus);
leaveRoutes.delete("/:id", deleteLeaveRequest);
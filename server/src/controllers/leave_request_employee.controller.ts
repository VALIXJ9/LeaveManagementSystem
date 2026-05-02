import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

// CREATE
export const createLeaveRequest = async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            from_date,
            to_date,
            return_date,
            leave_type,
            replacement_employee
        } = req.body;

        const leave = await prisma.leaveRequest.create({
            data: {
                user_id,
                from_date: new Date(from_date),
                to_date: new Date(to_date),
                return_date: new Date(return_date),
                leave_type,
                replacement_employee
            }
        });

        res.status(201).json(leave);
    } catch (err) {
        res.status(500).json({ error: "Failed to create leave request" });
    }
};

// GET by user
export const getUserLeaves = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);

        const leaves = await prisma.leaveRequest.findMany({
            where: { user_id: userId },
            orderBy: { created_at: "desc" }
        });

        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch leaves" });
    }
};

// GET LeaveRequests
export const getAllLeaves = async (req: Request, res: Response) => {
    try {
        const leaves = await prisma.leaveRequest.findMany({
            include: {
                user: true
            },
            orderBy: { created_at: "desc" }
        });

        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch leaves" });
    }
};

// UPDATE LeaveRequestStatus
export const updateLeaveStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await prisma.leaveRequest.update({
            where: { id: Number(id) },
            data: { status }
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
};

// DELETE LeaveRequest (Admin POV)
export const deleteLeaveRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.leaveRequest.delete({
            where: { id: Number(id) }
        });

        res.json({ message: "Leave request deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete leave request" });
    }
};

// Calculates the number of days between two dates (inclusive)
const calculateDays = (from: Date, to: Date) => {
    const diff = to.getTime() - from.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};

// Returns the remaining annual leave days for a user
// based on their yearly quota minus all approved leave days
// within the current calendar year
export const getRemainingDays = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);

        // 👇 get user quota
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        // 👇 filter ONLY current year
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfYear = new Date(new Date().getFullYear(), 11, 31);

        const approvedLeaves = await prisma.leaveRequest.findMany({
            where: {
                user_id: userId,
                status: "Approved",
                from_date: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            }
        });

        let usedDays = 0;

        approvedLeaves.forEach(l => {
            usedDays += calculateDays(
                new Date(l.from_date),
                new Date(l.to_date)
            );
        });

        const remaining = user.yearly_quota - usedDays;

        res.json({
            total: user.yearly_quota,
            used: usedDays,
            remaining
        });

    } catch {
        res.status(500).json({ error: "Failed to calculate days" });
    }
};
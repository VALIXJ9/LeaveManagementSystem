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

//
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

//
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
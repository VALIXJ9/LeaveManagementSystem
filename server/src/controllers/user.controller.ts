import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

// GET ALL USERS (already exists)
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // BASIC VALIDATION
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        // must contain letters AND numbers
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);

        if (!hasLetters || !hasNumbers) {
            return res.status(400).json({
                error: "Password must contain both letters and numbers"
            });
        }

        // CHECK UNIQUE EMAIL
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                is_admin: false
            }
        });

        res.status(201).json({ message: "Account created", user: newUser });

    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.json({
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction, RequestHandler } from "express";
import client from "../config/db";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
var key = process.env.SECRET_KEY as string;

// Register Function
export async function register(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Check if user already exists with the email
        const existingUser = await client.db("main").collection("users").findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Create the user and insert into database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            activeWorkout: false,
            customExercises: [],
        };
        const insertResult = await client.db("main").collection("users").insertOne(user);

        // Create the token
        const token = jwt.sign({ userId: insertResult.insertedId, firstName: firstName, lastName: lastName }, key, {
            expiresIn: "6hr",
        });
        res.status(200).json({ message: "Registration successful", token });
    } catch (error) {
        res.status(400).json({ message: "Failed to register", error });
    }
}

// Login Function
export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await client.db("main").collection("users").findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        // Create the token
        const token = jwt.sign({ userId: user._id, firstName: user.firstName, lastName: user.lastName }, key, {
            expiresIn: "6hr",
        });
        res.status(200).json({ message: "Login successful", token, firstName: user.firstName });
    } catch (error) {
        res.status(400).json({ message: "Failed to login", error });
    }
}

// Authetication
export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const decode = jwt.verify(token, key);
        req.body.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token " });
    }
}

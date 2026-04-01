import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, env.jwt.secret);

        const { sub, role } = decoded as any;

        req.user = {
            id: sub,
            role,
        };

        return next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}
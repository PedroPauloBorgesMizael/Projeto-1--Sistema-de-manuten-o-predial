import { Request, Response, NextFunction } from "express";
import { ValidateTokenService } from "../services/ValidateTokenService";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: "Token missing",
      });
    }

    const [, token] = authHeader.split(" ");

    const service = new ValidateTokenService();

    const tokenData = service.execute(token);

    if (!tokenData) {
      return response.status(401).json({
        message: "Token expired or invalid",
      });
    }

    const { userId, role } = tokenData;

    request.user = {
      id: userId,
      role,
    };

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token expired or invalid",
    });
  }
}
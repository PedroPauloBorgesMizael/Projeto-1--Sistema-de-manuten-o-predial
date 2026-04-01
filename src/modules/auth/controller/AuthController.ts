import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new AuthenticateUserService();

    const result = await service.execute({ email, password });

    return res.json(result);
  }
}
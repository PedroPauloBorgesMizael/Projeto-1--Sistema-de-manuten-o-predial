import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthController {

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Realiza login no sistema
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *       401:
   *         description: Credenciais inválidas
   */
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new AuthenticateUserService();

    const result = await service.execute({
      email,
      password,
    });

    return response.json(result);
  }
}
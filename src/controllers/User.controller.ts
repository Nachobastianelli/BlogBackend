import { Request, Response } from "express";
import { UserService } from "../services/User.services";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      const { hashedPassword, ...userData } = user.toObject();
      res.status(201).json(userData);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { mail, password } = req.body;
      const user = await UserService.getUserByEmail(mail, true);
      if (!user)
        return res.status(400).json({ message: "Credenciales inválidas" });

      const isValid = await user.comparePassword(password);
      if (!isValid)
        return res.status(400).json({ message: "Credenciales inválidas" });

      const { hashedPassword, ...userData } = user.toObject();
      res.json({ message: "Login exitoso", user: userData });
    } catch (error: any) {
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      const { hashedPassword, ...userData } = user.toObject();
      res.json(userData);
    } catch (error: any) {
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      const { hashedPassword, ...userData } = user.toObject();
      res.json(userData);
    } catch (error: any) {
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      res.json({ message: "Usuario eliminado" });
    } catch (error: any) {
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  }
}

import { Router } from "express";
import { UserController } from "../controllers/User.controller";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;

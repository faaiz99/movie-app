import { Router } from "express";
import { login, register, refreshToken } from "./controller";

const router = Router();

router.post("/register", register);

// router.post("/refresh-token", refreshToken);

router.post("/login", login);

export { router as userRouter };

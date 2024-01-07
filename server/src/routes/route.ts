import { Router } from "express";
import { movieRouter } from "../movie/route";
import { userRouter } from "../user/route";
import { reviewRouter } from "../review/route";

const router = Router();

router.use(movieRouter);
router.use(userRouter);
router.use(reviewRouter);

export { router as mainRouter };

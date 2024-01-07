import { Router } from "express";
import { movieRouter } from "../movie/route";
import { userRouter } from "../user/route";
import { reviewRouter } from "../review/route";
import { validateToken } from "../middewares/auth";

const router = Router();

router.use(movieRouter);
router.use(userRouter);
router.use(reviewRouter);
router.get("/", validateToken, (req, res) => {
	res.send("Movie API");
});

export { router as mainRouter };

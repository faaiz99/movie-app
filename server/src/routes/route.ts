import { Router } from "express";
import { movieRouter } from "../movie/route";
import { userRouter } from "../user/route";
import { reviewRouter } from "../review/route";

const router = Router();

router.get("/", (req, res) => {
	res.send("Movie API");
});
router.use(userRouter);
router.use(movieRouter);
router.use(reviewRouter);

export { router as mainRouter };

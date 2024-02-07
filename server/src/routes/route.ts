import { Router } from "express";

import { movieRouter } from "../movie/route";
import { reviewRouter } from "../review/route";
import { userRouter } from "../user/route";
const router = Router();

router.get("/", async (req, res) => {
	res.send("Movie API running");
});
router.use(userRouter);
router.use(movieRouter);
router.use(reviewRouter);

export { router as mainRouter };

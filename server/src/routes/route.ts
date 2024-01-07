import { Router } from "express";
import { movieRouter } from "../movie/route";
import { userRouter } from "../user/route";
import { reviewRouter } from "../review/route";
import { validateToken } from "../middewares/auth";

const router = Router();

router.get("/", validateToken, (req, res) => {
	res.send("Movie API");
});
router.use(userRouter);
router.use(validateToken,movieRouter);
router.use(validateToken,reviewRouter);


export { router as mainRouter };

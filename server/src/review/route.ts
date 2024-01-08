import { Router } from "express";
import {
	createReview,
	updateReviewById,
	deleteReviewById,
	getReviewById,
	getReviews,
} from "./controller";
const router = Router();

router.post("/reviews/:movieId", createReview);
router.get("/reviews", getReviews);
router.get("/reviews/:reviewId", getReviewById);
router.post("/reviews/:reviewId", updateReviewById);
router.delete("/reviews/:reviewId", deleteReviewById);

export { router as reviewRouter };

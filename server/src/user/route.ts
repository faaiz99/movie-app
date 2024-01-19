import { Router } from "express";
import { login, register, deleteUser } from "./controller";
import { checkSchema } from "express-validator";
import { validateToken } from "../middewares/auth";

const router = Router();

router.post(
	"/register",
	checkSchema({
		email: {
			isEmail: true,
			notEmpty: true,
			normalizeEmail: true,
			errorMessage: "Enter a Valid Email Address",
		},
		password: {
			notEmpty: true,
			isLength: { options: { min: 3 } },
			isString: true,
			errorMessage: "Password must be at least 6 characters long",
		},
		firstName: {
			notEmpty: true,
			isLength: { options: { min: 2 } },
			isAlpha: true,
			isString: true,
			errorMessage: "Enter a Valid First Name containing only letters",
		},
		lastName: {
			notEmpty: true,
			isLength: { options: { min: 2 } },
			isAlpha: true,
			isString: true,
			errorMessage: "Enter a Valid Last Name containing only letters",
		},
	}),
	register
);

// router.post("/refresh-token", refreshToken);

router.post(
	"/login",
	checkSchema({
		email: {
			isEmail: true,
			notEmpty: true,
			normalizeEmail: true,
			errorMessage: "Enter a Valid Email Address",
		},
		password: {
			notEmpty: true,
			isLength: { options: { min: 2 } },
			isString: true,
			errorMessage: "Password must be at least 3 characters long",
		},
	}),
	login
);

router.delete(
	"/user/:emailId",
	validateToken,
	checkSchema(
		{
			emailId: {
				isEmail: true,
				notEmpty: {
					errorMessage: "Email Id is Required",
				},
				normalizeEmail: true,
				errorMessage: "Enter a Valid Email Address",
			},
		},
		["params"]
	),
	deleteUser
);

export { router as userRouter };

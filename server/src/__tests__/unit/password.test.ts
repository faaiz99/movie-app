import bcrypt from "bcrypt";
import { comparePasswords } from "../../utils/password";

jest.mock("bcrypt");

const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe("comparePasswords", () => {
	const password = "password";
	const hashedPassword =
    "$2b$10$S0j1bJ3qzJz3z3z3z3z3z3z3z3z3z3z3z3z3z3z3z3z3z3z3z3z";

	it("should return true if passwords match", async () => {
		// @ts-ignore
		mockedBcrypt.compare.mockResolvedValue(true as boolean);

		const result = await comparePasswords(password, hashedPassword);

		expect(result).toBe(true);
		expect(mockedBcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
	});

	it("should return false if passwords do not match", async () => {
		// @ts-ignore
		mockedBcrypt.compare.mockResolvedValue(false as boolean);

		const result = await comparePasswords(password, hashedPassword);

		expect(result).toBe(false);
		expect(mockedBcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
	});
});

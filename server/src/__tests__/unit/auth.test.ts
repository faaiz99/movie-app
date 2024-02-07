// __tests__/unit/auth.test.ts
import jwt from "jsonwebtoken";

import { verifyToken } from "../../utils/auth";

jest.mock("jsonwebtoken");

describe("verifyToken", () => {
  const mockToken = "mockToken";
  const mockSecret = "secret";
  const mockDecodedToken = { userId: "123" };

  beforeEach(() => {
    process.env.JWT_SECRET = mockSecret;
  });

  afterEach(() => {
    process.env.JWT_SECRET = mockSecret;
    jest.resetAllMocks();
  });

  it("should verify the token and return the decoded token", () => {
    (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);

    const result = verifyToken(mockToken);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret);
    expect(result).toEqual(mockDecodedToken);
  });
  it("should throw an error if the token is invalid", () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    expect(() => {
      verifyToken(mockToken);
    }).toThrow("Invalid token");
  });
  it("should throw an error if JWT secret is not defined", () => {
    delete process.env.JWT_SECRET;
    expect(() => {
      verifyToken(mockToken);
    }).toThrow("JWT secret is not defined");
  });
});

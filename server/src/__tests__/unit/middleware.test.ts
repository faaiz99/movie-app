import { NextFunction, Request, Response } from "express";

import { validateToken } from "../../middewares/auth";
import { verifyToken } from "../../utils/auth";

jest.mock("../../utils/auth");

describe("validateToken", () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 403 if no token is provided", () => {
    mockRequest.headers = {};

    validateToken(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: false,
      message: "No token provided!",
    });
  });

  it("should return 401 if token is invalid", () => {
    mockRequest.headers = { authorization: "Bearer invalidToken" };
    (verifyToken as jest.Mock).mockReturnValue(null);

    validateToken(mockRequest, mockResponse, mockNext);

    expect(verifyToken).toHaveBeenCalledWith("invalidToken");
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: false,
      message: "Unauthorized! Please Login Again",
    });
  });

  it("should call next if token is valid", () => {
    mockRequest.headers = { authorization: "Bearer validToken" };
    (verifyToken as jest.Mock).mockReturnValue({ userId: "123" });

    validateToken(mockRequest, mockResponse, mockNext);

    expect(verifyToken).toHaveBeenCalledWith("validToken");
    expect(mockNext).toHaveBeenCalled();
  });

  it("should handle error if token verification throws an error", () => {
    mockRequest.headers = { authorization: "Bearer invalidToken" };
    const mockError = new Error("Invalid token");
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    validateToken(mockRequest, mockResponse, mockNext);

    expect(verifyToken).toHaveBeenCalledWith("invalidToken");
    //@ts-ignore
    expect(mockError.statusCode).toBe(401);
    expect(mockError.message).toBe("Invalid Token");
  });
});

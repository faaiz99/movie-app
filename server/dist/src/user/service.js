"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.register = exports.login = exports.LoginUserDTO = exports.CreateUserDTO = void 0;
const client_1 = require("@prisma/client");
const repository_1 = require("./repository");
const auth_1 = require("../utils/auth");
class CreateUserDTO {
    constructor() {
        this.id = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
    }
}
exports.CreateUserDTO = CreateUserDTO;
class LoginUserDTO {
    constructor() {
        this.email = "";
        this.password = "";
    }
}
exports.LoginUserDTO = LoginUserDTO;
const prisma = new client_1.PrismaClient();
const userRepository = new repository_1.UserRepository(prisma);
/**
 * Get user by email
 * compare the passowrd by decrypting the password
 * if the email is null or undefined, throw an error
 * if the password is correct, generate a token
 * return the token
 * if the password is incorrect, throw an error
 */
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserDTO = new LoginUserDTO();
    loginUserDTO.email = user.email;
    loginUserDTO.password = user.password;
    const authenticatedUser = yield userRepository.login(loginUserDTO);
    if (!authenticatedUser) {
        throw new Error(`User not found with email ${loginUserDTO.email} or Password is incorrect`);
    }
    else {
        //generate token
        const token = (0, auth_1.createToken)({ id: authenticatedUser.id });
        // probably return user information along with auth token
        const user = {
            id: authenticatedUser.id,
            firstName: authenticatedUser.firstName,
            lastName: authenticatedUser.lastName,
            email: authenticatedUser.email,
        };
        return { token, user };
    }
});
exports.login = login;
/**
 * Get user by email
 * if the email is null or undefined, throw an error
 * if the email is not null or undefined, throw an error
 * create a new user
 * return the user
 * ideally we should tell the user to login by redirecting them
 * on the frontend is registration is successfull
 */
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const registerUserDTO = new CreateUserDTO();
    registerUserDTO.firstName = user.firstName;
    registerUserDTO.lastName = user.lastName;
    registerUserDTO.email = user.email;
    registerUserDTO.password = user.password;
    const userExists = yield userRepository.getUserByEmail(registerUserDTO.email);
    if (!userExists) {
        const newUser = yield userRepository.register(registerUserDTO);
        return newUser;
    }
    else {
        throw new Error(`User already exists with email ${registerUserDTO.email}`);
    }
});
exports.register = register;
/**
 * Get the user by token
 * the token is present in the request header
 * [Authorization] = 12233223
 * if the token is valid, generate a new token
 * return the new token
 * if the token is invalid, throw an error telling the user to login again
 */
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return token;
});
exports.refreshToken = refreshToken;

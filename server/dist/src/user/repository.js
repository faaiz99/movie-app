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
exports.UserRepository = void 0;
const password_1 = require("../utils/password");
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, firstName, lastName, password } = user;
            const encodedPassword = yield (0, password_1.hashPassword)(password);
            return yield this.prisma.user.create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: encodedPassword,
                },
            });
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = user;
            const foundUser = yield this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (foundUser && (yield (0, password_1.comparePasswords)(password, foundUser.password))) {
                return foundUser;
            }
            return null;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
        });
    }
}
exports.UserRepository = UserRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var controller_1 = require("./controller");
var router = (0, express_1.Router)();
exports.userRouter = router;
router.post("/register", controller_1.register);
router.post("/refresh-token", controller_1.refreshToken);
router.post("/login", controller_1.login);

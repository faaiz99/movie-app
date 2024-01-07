"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const route_1 = require("../movie/route");
const route_2 = require("../user/route");
const route_3 = require("../review/route");
const auth_1 = require("../middewares/auth");
const router = (0, express_1.Router)();
exports.mainRouter = router;
router.get("/", auth_1.validateToken, (req, res) => {
    res.send("Movie API");
});
router.use(route_2.userRouter);
router.use(auth_1.validateToken, route_1.movieRouter);
router.use(auth_1.validateToken, route_3.reviewRouter);

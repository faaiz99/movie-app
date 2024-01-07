"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./src/app");
var port = process.env.PORT || 3000;
app_1.httpServer.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});

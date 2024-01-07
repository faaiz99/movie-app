"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const port = process.env.PORT || 3000;
app_1.httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { Application } from "express";
import { handleError } from "./middewares/error";
import { mainRouter } from "./routes/route";

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", mainRouter);
app.use(handleError);

export default app;
export const httpServer = createServer(app);

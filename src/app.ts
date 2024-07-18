/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

const getACtonroller = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getACtonroller);

app.use(globalErrorHandler);

app.use(notFound);

export default app;

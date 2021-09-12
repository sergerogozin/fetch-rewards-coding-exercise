import express from "express";
import payersRouter from "./api/v1/payersRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/api/v1/payers", payersRouter);

export default rootRouter;
import express from "express";
import rootRouter from "./routes/rootRouter.js";

const app = express();
app.use(express.json())
app.use(rootRouter);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening...')
});

export default app;
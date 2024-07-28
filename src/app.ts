import express from "express";
import { notFound } from "../src/middlewares/errorHandler";
import connectDB from "./config/mongoDB";
import { apiRouter } from "./routes/api";
const app = express();
const port = process.env.PORT;

// mongoDB
connectDB();

// express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiRouter);

app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

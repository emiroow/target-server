import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { errorHandler, notFound } from "../src/middlewares/errorHandler";
import connectDB from "./config/mongoDB";
import { apiRouter } from "./routes/api";
const app = express();
const port = process.env.PORT;

// mongoDB
connectDB();

// express
app.use(morgan("dev"));

// cors
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use("/images", express.static(path.resolve("./public/images")));
// api
app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

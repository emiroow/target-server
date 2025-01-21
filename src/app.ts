import { errorHandler, notFound } from "@middlewares/errorHandler";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import moduleAlias from "module-alias";
import "module-alias/register";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/mongoDB";
import { apiRouter } from "./routes/api";
dotenv.config();

const app = express();

const port = process.env.PORT;

const isProduction = process.env.NODE_ENV === "production";
moduleAlias.addAliases({
  "@config": isProduction ? "dist/config" : "src/config",
  "@controllers": isProduction ? "dist/controllers" : "src/controllers",
  "@middlewares": isProduction ? "dist/middlewares" : "src/middlewares",
  "@interface": isProduction ? "dist/interface" : "src/interface",
  "@models": isProduction ? "dist/models" : "src/models",
  "@utils": isProduction ? "dist/utils" : "src/utils",
  "@common": isProduction ? "dist/utils/common" : "src/utils/common",
  "@helper": isProduction ? "dist/utils/helper" : "src/utils/helper",
  "@routes": isProduction ? "dist/routes" : "src/routes",
  "@schemas": isProduction ? "dist/schemas" : "src/schemas",
  "@types": isProduction ? "dist/types" : "src/types",
  "@validations": isProduction ? "dist/validations" : "src/validations",
});

// mongoDB
connectDB();

// express
app.use(morgan("dev"));

const corsOptions = {
  origin: "*", // Your React app's URL
  methods: ["GET", "POST", "OPTIONS", "PUSH", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization", "authorization"],
};

// cors
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use(
  "/images",
  express.static(
    path.resolve(isProduction ? "public/images" : "./public/images")
  )
);

// api
app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

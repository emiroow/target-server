import express from "express";
import mongoose from "mongoose";
const app = express();
const uri = process.env.DB_CONNECTION;
const port = process.env.PORT;

import { apiRouter } from "./routes/api";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(apiRouter);

app.listen(port, () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("connect to db");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("Server is running on port 3000");
});

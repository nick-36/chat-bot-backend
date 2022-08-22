import cors from "cors";

import express from "express";

import authRouter from "./routes/auth.js";

// console.log(dotenv);
const app = express();

//CORS
app.use(cors());

app.use(express.json());
// app.use(express.urlencoded());

//Routes
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use("/api/v1/auth", authRouter);

export default app;

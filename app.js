import cors from "cors";

import express from "express";
import corsOptions from "./config/corsOptions.js";
import authRouter from "./routes/auth.js";

const app = express();

//CORS
app.use(cors(corsOptions));

app.use(express.json());
// app.use(express.urlencoded());

//Routes
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use("/api/v1/auth", authRouter);

export default app;

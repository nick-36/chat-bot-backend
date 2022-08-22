import * as dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(port, function (req, res) {
  console.log(`App Is Connected to ${port}`);
});

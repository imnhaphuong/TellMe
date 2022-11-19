//config dotenv
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
connectDB();

//call API
const userAPI = require("./routes/userRoutes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userAPI);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(
    `server is running example is listening at http://localhost:${port}`
  );
});

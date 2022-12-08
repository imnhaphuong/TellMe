require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");

app.use(express.json());

//call API
const userAPI = require("./routes/userRoutes");
app.use("/api/users", userAPI);
app.use("/", (req, res) => {
  res.send({
    status: "success",
  });
});

//Connect mongodb
const mongoUri = `mongodb+srv://nhaphuong:!2345@cluster0.nepewkn.mongodb.net/TellMe?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Check connection
mongoose.connection.on("connected", () => {
  console.log("Yehhh, congratulation! Connected with Mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Has an error when connect with Mongo", err);
});

app.listen(port, () => {
  console.log(
    `server is running example is listening at http://localhost:${port}`
  );
});

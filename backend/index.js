require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

//call API
const accessToken = require("./access-token");
const userAPI = require("./routes/userRoutes");
app.get("/", (req, res) => {
  res.send({
    status: "success",
  });
});
app.use("/agora", accessToken);
app.use("/api/users", userAPI);

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

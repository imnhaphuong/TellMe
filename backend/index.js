require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const nocache = require("./access-token");
const generateAccessToken = require("./access-token");
//call API
const userAPI = require("./routes/userRoutes");
const messageAPI = require("./routes/messageRoute");
const conversationAPI = require("./routes/conversationRoute");


app.get("/", (req, res) => {
  res.send({
    status: "success",
  });
});
app.get("/access-token", nocache, generateAccessToken);
app.use("/api/users", userAPI);
app.use("/api/message", messageAPI);
app.use("/api/convers", conversationAPI);



//Connect mongodb
const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nepewkn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
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

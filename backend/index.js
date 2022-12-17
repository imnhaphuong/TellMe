require("dotenv").config();
var express = require("express");
const http = require("http");
var app = express();
app.use(express.json());
const server = http.createServer(app);

//Config socket.io
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const nocache = require("./access-token");
//call API
const generateAccessToken = require("./access-token");
const userAPI = require("./routes/userRoutes");
const messageAPI = require("./routes/messageRoute");
const conversationAPI = require("./routes/conversationRoute");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.send({
    status: "success",
  });
});
app.get("/access-token", nocache, generateAccessToken);
app.use("/api/users", userAPI);
app.use("/api/messages", messageAPI);
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

server.listen(port, () => {
  console.log(
    `server is running example is listening at http://localhost:${port}`
  );
});

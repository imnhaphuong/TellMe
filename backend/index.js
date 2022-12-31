require('express-async-errors');
require("dotenv").config();
var express = require("express");
const createError = require('http-errors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require("http");
var app = express();
app.use(express.json());
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
app.use(cookieParser());


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
// gridfs
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const methodOverride = require("method-override")
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
//call API
const generateAccessToken = require("./access-token");
const userAPI = require("./routes/userRoutes");
const messageAPI = require("./routes/messageRoute");
const conversationAPI = require("./routes/conversationRoute");

//config cors
const cors = require("cors");

const authRouter = require('./routes/userRoutes');
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: false,
  })
);

const fileRouter = require('./routes/fileRoute');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//end config cors
app.get("/", (req, res) => {
  res.send({
    status: "success",
  });
});
app.get('/rtc/:channel/:role/:tokentype', nocache , generateAccessToken)
app.get("/access-token", nocache, generateAccessToken);
app.use("/api/users", userAPI);
app.use("/api/messages", messageAPI);
app.use("/api/convers", conversationAPI);
app.use('/auth', authRouter);

//middleware
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.set('view engine','ejs')
//Connect mongodb
const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nepewkn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



//create storage emgie
const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
app.use('/api/files',fileRouter(upload));
//Check connection
mongoose.connection.on("connected", () => {
  console.log("Yehhh, congratulation! Connected with Mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Has an error when connect with Mongo", err);
});

// ------------------------------------------------------- //
//Config socket.io
const socketEvents = require("./events");
const io = require ("socket.io") (server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket. New client is " + socket.id);
  socket.on('userConnected', (uid) => {
    socket.join (uid)
    io.to(uid).emit("connected", uid);
  });
  socket.on('userDisconnected', (uid) => {
    socket.leave(uid)
    io.to(uid).emit("leave", uid);
  });

  //register socket
  socket.on("setup", (userId) => {
    socketEvents.register(socket, io, userId)
  });

  //send call notif
  socket.on("calling", (call) => {
    socketEvents.call(socket, io , call)
  });

  //decline a call
  socket.on("res-decline", (call) =>{
    socketEvents.decline(socket, io, call)
  })
  //user disconnect
  socket.on("disconnect", () => {
    socketEvents.disconnect(socket, io);
  });
});
// ------------------------------------------------------- //

server.listen(port, () => {
  console.log(
    `server is running example is listening at http://localhost:${port}`
  );
});

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



const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const nocache = require("./access-token");
// gridfs
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage")
const methodOverride = require("method-override")
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
app.get('/rtc/:channel/:role/:tokentype', nocache, generateAccessToken)
app.get("/access-token", nocache, generateAccessToken);
app.use("/api/users", userAPI);
app.use("/api/messages", messageAPI);
app.use("/api/convers", conversationAPI);
app.use('/auth', authRouter);

//middleware
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
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
app.use('/api/files', fileRouter(upload));
//Check connection
mongoose.connection.on("connected", () => {
  console.log("Yehhh, congratulation! Connected with Mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Has an error when connect with Mongo", err);
});

// ------------------------------------------------------- //
//Config socket.io
let users = [];
const socketEvents = require("./events");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});



const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  console.log("Connected to Socket. New client is " + socket.id);
  socket.on('userConnected', (uid) => {
    socket.join(uid)
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
    socketEvents.call(socket, io, call)
  });

  //decline a call
  socket.on("res-decline", (call) => {
    socketEvents.decline(socket, io, call)
  })

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  console.log("socket",socket.id)

  // //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    // console.log("receiverId",user);
    if (user !== undefined) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }

  });

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

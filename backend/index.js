var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  }); 


socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id); 

  socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

server.listen(4000, () => {
    console.log('Server đang chay tren cong 4000');
});
// require("dotenv").config();

// const express = require("express");
// const app = express();
// app.use(express.json());

// const port = process.env.PORT || 4000;
// const mongoose = require("mongoose");
// const nocache = require("./access-token");
// const generateAccessToken = require("./access-token");
// //call API
// const userAPI = require("./routes/userRoutes");
// app.get("/", (req, res) => {
//   res.send({
//     status: "success",
//   });
// });
// app.get("/access-token", nocache, generateAccessToken);
// app.use("/api/users", userAPI);

// //Connect mongodb
// const mongoUri = `mongodb+srv://nhaphuong:!2345@cluster0.nepewkn.mongodb.net/TellMe?retryWrites=true&w=majority`;
// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// //Check connection
// mongoose.connection.on("connected", () => {
//   console.log("Yehhh, congratulation! Connected with Mongo");
// });
// mongoose.connection.on("error", (err) => {
//   console.log("Has an error when connect with Mongo", err);
// });

// const server  = app.listen(port, () => {
//   console.log(
//     `server is running example is listening at http://localhost:${port}`
//   );
// });


// const io = require ("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: `http://localhost:${port}`
//   }
// })

// io.on('connection', (socket)=>{
//   console.log('Yahoohh, connected with socket.io ');
// })


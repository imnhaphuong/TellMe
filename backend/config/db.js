const mongoose = require("mongoose");

const connectDB = () => {
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
};

module.exports = connectDB


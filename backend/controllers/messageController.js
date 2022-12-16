const Message = require("../models/message");

const messageController = {
  getAllMessages(req, res) {
    User.find()
      .then((data) => {
        console.log("got all users");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },
  sendMess: async (req, res) => {
    const newMessage = new Message(req.body);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMessByConvers: async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};

module.exports = messageController;

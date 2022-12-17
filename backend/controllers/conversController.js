const router = require("express").Router();
const Conversation = require("../models/conversation");

//new conv
const conversController = {
    createConversation: async (req, res) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });
        try {
            const savedConversation = await newConversation.save();
            console.log("savedConversation", savedConversation);
            res.status(200).json(savedConversation);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get conv of a user
    getConverOfUser: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] },
            }).populate("members")
            res.status(200).json(conversation);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getConverById: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                _id: req.params.converId,
            }).populate("members")
            res.status(200).json(conversation);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllConvers: async (req, res) => {
        Conversation
            .find({})
            .populate("members")
            .then((data) => {
                console.log("got all convers");
                res.send(data);
            })
            .catch((err) => {
                console.log("err", err);
                res.send([]);
            });
    },
    // router.get("/:userId", async (req, res) => {
    //     try {
    //         const conversation = await Conversation.find({
    //             members: { $in: [req.params.userId] },
    //         });
    //         res.status(200).json(conversation);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // });

    // // get conv includes two userId

    // router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    //     try {
    //         const conversation = await Conversation.findOne({
    //             members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    //         });
    //         res.status(200).json(conversation)
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // });

}

module.exports = conversController;

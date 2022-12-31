const Call = require("../models/call");

const callController = {
    getAllCallsByUID(req, res) {
        Call.find({ sender: req.body.sender })
            .then((data) => {
                console.log("got all users by ui");
                res.send(data);
            })
            .catch((err) => {
                console.log("err", err);
                res.send([]);
            });
    },
    async addCall(req, res) {
        console.log(req.body);
        const newCall = new Call(req.body);
        try {
            const savedCall = await newCall.save();
            res.status(200).json(savedCall);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = callController;

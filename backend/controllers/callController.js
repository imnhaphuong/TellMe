const Call = require("../models/call");

const callController = {
    getAllCallsByUID(req, res) {
        const result = {}
        //get calls has sender is user id
        Call.find({ sender: req.body.user_id })
            .populate('sender')
            .populate('receiver')
            .sort({createdAt: 'desc'})
            .then((data) => {
                result.sent_list = data
                //get calls has receiver is user id
                Call.find({ receiver: req.body.user_id })
                    .populate('sender')
                    .populate('receiver')
                    .sort({createdAt: 'desc'})
                    .then((data2) => {
                        result.received_list = data2
                        result.missed_list = result.sent_list.concat(data2).filter(e => e.status == 1)
                        console.log('rs', result);
                        res.send(result)
                    })
                    .catch((err) => {
                        console.log("err", err);
                        res.send(result)
                    });
            })
            .catch((err) => {
                console.log("err", err);
                res.send(result);
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

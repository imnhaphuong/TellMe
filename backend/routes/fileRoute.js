const express = require('express');
const fileRouter = express.Router();
const mongoose = require('mongoose');
const File = require('../models/file');
const { response } = require('express');

module.exports = (upload) => {
    const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nepewkn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const url = mongoUri;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    let gfs;

    connect.once('open', () => {
        // initialize stream
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
    });

    /*
        POST: Upload a single File/file to File collection
    */
    fileRouter.route('/')
        .post(upload.single('file'), (req, res, next) => {
            console.log(req.body);


            let newFile = new File({
                conversationId: req.body.conversationId,
                sender: req.body.sender,
                name: req.body.name,
                filename: req.file.filename,
                contentType: req.file.contentType
            });

            newFile.save()
                .then((File) => {

                    res.status(200).json({
                        success: true,
                        File,
                    });
                })
                .catch(err => res.status(500).json(err));

        })
        .get((req, res, next) => {
            File.find({})
                .then(Files => {
                    res.status(200).json({
                        success: true,
                        Files,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        GET: Delete an File from the collection
    */
    fileRouter.route('/delete/:id')
        .get((req, res, next) => {
            File.findOne({ _id: req.params.id })
                .then((File) => {
                    if (File) {
                        File.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    message: `File with ID: ${req.params.id} deleted`,
                                });
                            })
                            .catch(err => { return res.status(500).json(err) });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: `File with ID: ${req.params.id} not found`,
                        });
                    }
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        GET: Fetch most recently added record
    */
    fileRouter.route('/recent')
        .get((req, res, next) => {
            File.findOne({}, {}, { sort: { '_id': -1 } })
                .then((File) => {
                    res.status(200).json({
                        success: true,
                        File,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        POST: Upload multiple files upto 3
    */
    fileRouter.route('/multiple')
        .post(upload.array('file', 3), (req, res, next) => {
            res.status(200).json({
                success: true,
                message: `${req.files.length} files uploaded successfully`,
            });
        });

    /*
        GET: Fetches all the files in the uploads collection
    */
    fileRouter.route('/files')
        .get((req, res, next) => {
            gfs.find().toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available'
                    });
                }

                res.status(200).json({
                    success: true,
                    files,
                });
            });
        });

    /*
        GET: Fetches a particular file by filename
    */
    // fileRouter.route('/file/:filename')
    //     .get((req, res, next) => {
    //         gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    //             if (!files[0] || files.length === 0) {
    //                 return res.status(200).json({
    //                     success: false,
    //                     message: 'No files available',
    //                 });
    //             }

    //             res.status(200).json({
    //                 success: true,
    //                 file: files[0],
    //             });
    //         });
    //     });

    /* 
        GET: Fetches a particular File and render on browser
    */
    fileRouter.route('/File/:filename')
        .get((req, res, next) => {
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                console.log("files[0]",files[0])
                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                    // render File to browser
                    // const readstream = gfs.createReadStream(files[0].filename)
                    // readstream.pipe(res)
                    console.log("files[0]",files[0])
                    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
                } else {
                    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
                }
            });
        });

    /*
        DELETE: Delete a particular file by an ID
    */
    fileRouter.route('/file/del/:id')
        .post((req, res, next) => {
            console.log(req.params.id);
            gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
                if (err) {
                    return res.status(404).json({ err: err });
                }

                res.status(200).json({
                    success: true,
                    message: `File with ID ${req.params.id} is deleted`,
                });
            });
        });

    return fileRouter;
};
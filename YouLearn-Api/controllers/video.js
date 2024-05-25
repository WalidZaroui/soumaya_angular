const Video = require('../models/video');


exports.getVideoByLesson = async (req, res, next) => {
    if (!req.params.lesson) {
        res.json({
            error: "lesson Not Found"
        });
    }
    else {
        const video = await Video.find({lesson: req.params.lesson});
        res.json({
            video: video
        });
    }
};

exports.getVideo = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    const video = await Video.findById(req.params.id);
    if (!video) {
        res.json({
            error: "video Not Found"
        });
    }
    else {

        res.json({
            video: video
        });
    }
};

exports.getAll = async (req, res, next) => {
    const videos = await Video.find();
    res.json({
        videos: videos
    });
};

exports.createVideo = async (req, res, next) => {
    const video = new Video({
        url: req.body.url,
        lesson: req.body.lesson,
    });
    await video.save();
    // Create video in db
    res.json({
        message: 'video created successfully!',
        video: video
    });
};

exports.updateVideo = async (req, res, next) => {
    const video = await Video.findById(req.body._id);
    if (!video) {
        res.json({
            error: "video Not Found"
        });
    }
    else {
        video.url = req.body.url;
        video.lesson = req.body.lesson;

        await video.save();

        res.json({
            message: 'video updated successfully!',
            video: video
        });
    }
};

exports.deleteVideo = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const video = await Video.findById(req.params.id);
        if (!video) {
            res.json({
                error: "video Not Found"
            });
        }
        else {
            video.remove();

            res.json({
                message: "video Removed"
            });
        }
    }
};

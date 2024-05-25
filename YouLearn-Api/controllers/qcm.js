const Qcm = require('../models/qcm');


exports.getQcmByLesson = async (req, res, next) => {
    if (!req.params.lesson) {
        res.json({
            error: "lesson Not Found"
        });
    }
    else {
        const qcm = await Qcm.find({lesson: req.params.lesson});
        res.json({
            qcm: qcm,
            message: 'recieve'
        });
    }
};

exports.getQcm = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    const qcm = await Qcm.findById(req.params.id);
    if (!qcm) {
        res.json({
            error: "qcm Not Found"
        });
    }
    else {

        res.json({
            qcm: qcm
        });
    }
};

exports.getAll = async (req, res, next) => {
    const qcms = await Qcm.find();
    res.json({
        qcms: qcms
    });
};

exports.createQcm = async (req, res, next) => {
    const qcm = new Qcm({
        question: req.body.question,
        wrong: req.body.wrong,
        right: req.body.right,
        lesson: req.body.lesson,
    });
    await qcm.save();
    // Create qcm in db
    res.json({
        message: 'qcm created successfully!',
        qcm: qcm
    });
};

exports.updateQcm = async (req, res, next) => {
    const qcm = await Qcm.findById(req.body._id);
    if (!qcm) {
        res.json({
            error: "qcm Not Found"
        });
    }
    else {
        qcm.question = req.body.question;
        qcm.wrong = req.body.wrong;
        qcm.right = req.body.right;
        qcm.lesson = req.body.lesson;

        await qcm.save();

        res.json({
            message: 'qcm updated successfully!',
            qcm: qcm
        });
    }
};

exports.deleteQcm = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const qcm = await Qcm.findById(req.params.id);
        if (!qcm) {
            res.json({
                error: "qcm Not Found"
            });
        }
        else {
            qcm.remove();

            res.json({
                message: "qcm Removed"
            });
        }
    }
};

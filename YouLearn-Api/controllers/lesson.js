const Lesson = require('../models/lesson');

exports.getLessons = async (req, res, next) => {
    const lessons = await Lesson.find().sort({number: 'asc'});
    res.json({
        categories: lessons
    });
};

exports.getLessonsByCourse = async (req, res, next) => {
    if (!req.params.course) {
        res.json({
            error: "course Not Found"
        });
    }
    else {
        const lessons = await Lesson.find({course: req.params.course}).sort({number: 'asc'});
        res.json({
            lessons: lessons
        });
    }
};

exports.getLesson = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
        res.json({
            error: "lesson Not Found"
        });
    }
    else {

        res.json({
            lesson: lesson
        });
    }
};

exports.createLesson = async (req, res, next) => {
    const lesson = new Lesson({
        name: req.body.name,
        course: req.body.course,
        description: req.body.description
    });
    await lesson.save();
    // Create lesson in db
    res.json({
        message: 'lesson created successfully!',
        lesson: lesson
    });
};

exports.updateLesson = async (req, res, next) => {
    const lesson = await Lesson.findById(req.body._id);
    if (!lesson) {
        res.json({
            error: "lesson Not Found"
        });
    }
    else {
        lesson.name = req.body.name;
        lesson.course = req.body.course;

        await lesson.save();

        res.json({
            message: 'lesson updated successfully!',
            lesson: lesson
        });
    }
};

exports.deleteLesson = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            res.json({
                error: "lesson Not Found"
            });
        }
        else {
            lesson.remove();

            res.json({
                message: "lesson Removed"
            });
        }
    }
};

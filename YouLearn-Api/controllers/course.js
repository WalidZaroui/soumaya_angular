const Course = require('../models/course');
const User = require('../models/user');

exports.getCourses = async (req, res, next) => {
    const courses = await Course.find();
    res.json({
        courses: courses
    });
};
exports.getUserCourses = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const trainer = await User.findById(req.userId);
        if (trainer.role === "trainer") {
            const courses = await Course.find({publisher: req.userId});
            res.json({
                courses: courses
            });
        }
    }
};
exports.getCoursesByCategory = async (req, res, next) => {
    if (!req.params.category) {
        res.json({
            error: "Category Not Found"
        });
    }
    const courses = await Course.find({category: req.params.category});
    if (!courses) {
        res.json({
            error: "courses Not Found"
        });
    }
    else {

        res.json({
            courses: courses
        });
    }
};

exports.getCourse = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const course = await Course.findById(req.params.id);
        if (!course) {
            res.json({
                error: "course Not Found"
            });
        }
        else {
            res.json({
                course: course
            });
        }
    }
};

exports.buyCourse = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        if (!req.params.id) {
            res.json({
                error: "Id Not Found"
            });
        } else {
            const course = await Course.findById(req.params.id);
            if (!course) {
                res.json({
                    error: "course Not Found"
                });
            } else {
                const user = await User.findById(req.userId);
                if (!user.courses.enrolled.find(x => course._id.toString() === x._id.toString())){
                    user.courses.enrolled.push(course);
                    await user.save();
                    res.json({
                        user: user
                    });
                } else {
                    res.json({
                        error: "course esxist"
                    });
                }
            }
        }
    }
};


exports.createCourse = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const trainer = await User.findById(req.userId);
        if (trainer.role === "client") {
            res.json({
                error: "Not a client"
            });
        } else {
            const course = new Course({
                name: req.body.name,
                description: req.body.description,
                duration: req.body.duration,
                image: req.body.image,
                price: req.body.price,
                publisher: req.userId,
                category: req.body.category
            });
            await course.save();
            // Create course in db
            res.json({
                message: 'Course created successfully!',
                course: course
            });
        }
    }
};

exports.updateCourse = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const trainer = await User.findById(req.userId);
        if (trainer.role !== "trainer") {
            res.json({
                error: "Not a trainer"
            });
        } else {
            const course = await Course.findById(req.body._id);
            if (!course) {
                res.json({
                    error: "course Not Found"
                });
            } else if (course.publisher != req.userId) {
                res.json({
                    error: "Not your course"
                });
            }
            else {
                course.name = req.body.name;
                course.description = req.body.description;
                course.duration = req.body.duration;
                course.image = req.body.image;
                course.price = req.body.price;
                course.publisher = req.body.publisher;
                course.category = req.body.category;
                await course.save();

                res.json({
                    message: 'course updated successfully!',
                    course: course
                });
            }
        }
    }
};

exports.deleteCourse = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const trainer = await User.findById(req.userId);
        if (trainer.role !== "trainer") {
            res.json({
                error: "Not a trainer"
            });
        } else {
            if (!req.params.id) {
                res.json({
                    error: "Id Not Found"
                });
            } else {
                const course = await Course.findById(req.params.id);
                if (!course) {
                    res.json({
                        error: "course Not Found"
                    });
                } else if ( course.publisher != req.userId) {
                    res.json({
                        error: "Not your course",
                    });
                }
                else {
                    course.remove();

                    res.json({
                        message: "course Removed"
                    });
                }
            }
        }
    }
};

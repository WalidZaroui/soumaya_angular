const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

exports.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.json({
        users: users
    });
};

exports.getUser = async (req, res, next) => {
    if (!req.userId) {
        res.json({
            error: "Not Auth"
        });
    }
    else {
        const user = await User.findById(req.userId);
        if (!user) {
            res.json({
                error: "User Not Found"
            });
        }
        else {

            res.json({
                user: user
            });
        }
    }
};

exports.createUser = async (req, res, next) => {
   const user = new User({
       firstName: req.body.firstName,
       familyName: req.body.firstName,
       email: req.body.email,
       password: await bcrypt.hash(req.body.password, 12),
       role: req.body.role,
       birthday: req.body.birthday,
       phoneNumber: req.body.phoneNumber,
       photo: req.body.photo
   });
   await user.save();
    // Create user in db
    await res.json({
        message: 'User created successfully!',
        user: user
    });
};

exports.updateUser = async (req, res, next) => {
    if (!req.userId) {
        await res.json({
            error: "Not Auth"
        });
    }
    else {
        const user = await User.findById(req.userId);
        if (!user) {
            await res.json({
                error: "User Not Found"
            });
        }
        else {
            user.firstName = req.body.firstName;
            user.familyName = req.body.familyName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.role = req.body.role;
            user.birthday = req.body.birthday;
            user.phoneNumber = req.body.phoneNumber;
            user.photo = req.body.photo;

            await user.save();

            await res.json({
                message: 'User updated successfully!',
                users: user
            });
        }
    }
};

exports.deleteUser = async (req, res, next) => {
    if (!req.params.id) {
        await res.json({
            error: "Id Not Found"
        });
    }
    else {
        const user = await User.findById(req.params.id);
        if (!user) {
            await res.json({
                error: "User Not Found"
            });
        } else {
            user.remove();

            await res.json({
                message: "User Removed"
            });
        }
    }
};

exports.login = async (req, res, next) => {
    if (!validator.isEmail(req.body.email.toLowerCase())) {
        res.json({
            error: "Email not valid"
        })
    }
    const user = await User.findOne({email: req.body.email.toLowerCase()});
   if (!user) {
       await res.json({
           error: "User Not Found"
       })
    }
    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
        await res.json({
            error: "Password Incorrect"
        })
    }
    else {
        const token = await jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            'secretAuthToken',
        );

        await res.json({
            token: token,
            userId: user._id.toString()
        });
    }


};

exports.file = async (req, res, next) => {
    let form = new formidable.IncomingForm();
    let oldPath;
    let newPath;
    await form.parse(req, function (err, fields, files) {
        oldPath = files.filetoupload.path;
        newPath = path.dirname(require.main.filename) + '/files/' + new Date().toISOString().replace(/:/g, '-') + '-' +  files.filetoupload.name;
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            res.json({
                path: newPath,
            });
        });
});
};

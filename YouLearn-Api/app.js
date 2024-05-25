const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const courseRoutes = require('./routes/course');
const qcmRoutes = require('./routes/qcm');
const videoRoutes = require('./routes/video');
const lessonRoutes = require('./routes/lesson');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const cors = require('cors');

const Category = require('./models/category');
const Video = require('./models/video');
const Qcm = require('./models/qcm');
const Lesson = require('./models/lesson');
const Course = require('./models/course');
const User = require('./models/user');




const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(auth);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(courseRoutes);
app.use(qcmRoutes);
app.use(lessonRoutes);
app.use(videoRoutes);

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './files'
});

app.post('/upload', multipartMiddleware, (req, res) => {
    console.log(req.files);
    res.json({
        'message': 'File uploaded succesfully.',
        'name': req.files.uploads[0].path.split("\\")[1]
    });
});

app.use('/files', express.static('files'));
app.get('/files/:name', function (req, res, next) {
    const fileName = req.params.name;
    res.sendFile(fileName, function (err) {console.log(err)}); });

mongoose
    .connect(
        'mongodb+srv://walid:walid@cluster0.wzyzi5x.mongodb.net/youlearn')
    .then(result => {
        app.listen(8080);
        console.log("Running !")
       
    })
    .catch(err => console.log(err));


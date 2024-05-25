const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
    {
        name: {
            type: String,
        },
        number: {
            type: Number,
            autoIncrement: true
        },
        description: {
            type: String
        },
        course:  {type: Schema.Types.ObjectID, ref: 'Course'}

    }

);

module.exports = mongoose.model('Lesson', lessonSchema);

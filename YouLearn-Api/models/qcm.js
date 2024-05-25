const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qcmSchema = new Schema(
    {
        question: {type: String},
        wrong: [{type: String}],
        right: [{type: String}],

        lesson:  {type: Schema.Types.ObjectID, ref: 'Lesson'}


    }
);

module.exports = mongoose.model('Qcm', qcmSchema);

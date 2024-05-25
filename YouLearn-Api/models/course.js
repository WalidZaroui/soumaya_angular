const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        duration: {
            type: Number
        },
        image: {
            type: String,
        },

        price: {
            type: Number,
        },
        publisher: {type: Schema.Types.ObjectID, ref: 'User'},
        category: {type: Schema.Types.ObjectID, ref: 'Category'},
    }

);

module.exports = mongoose.model('Course', courseSchema);

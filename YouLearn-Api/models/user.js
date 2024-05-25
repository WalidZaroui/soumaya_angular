const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        familyName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        role: {
            type: String,
        },

        password: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        phoneNumber: {
            type: Number,
        },
        photo: {
            type: String,
        },
        courses: {
            enrolled:
                [
                    {
                        _id: {type: Schema.Types.ObjectId, ref: 'Course'},
                        orderDate: {type: Date, default: Date.now()}
                    }
                ]
        },
    }

);

module.exports = mongoose.model('User', clientSchema);

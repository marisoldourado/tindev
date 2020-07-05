const { Schema, model } = require('mongoose')

// table structure
const DevSchema = new Schema({
    name : {
        type: String,
        require: true,
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
}, {
    // create automatically a column createdAt, updatedAt
    timestamps: true
})

module.exports = model('Dev', DevSchema)
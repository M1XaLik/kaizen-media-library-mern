const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: true,
    },
    mediaUrl: {
        type: String,
        required: true,
    },
    coverUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    playlist: {
        type: String,
        required: false,
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = model("Media", schema);

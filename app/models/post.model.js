const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    content: String,
    categoryID: String,
    remarks: String,
    publish: Boolean

}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
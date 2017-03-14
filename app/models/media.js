const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaModulesSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Media title is required']
        },
        mimeType: {
            type: String,
            required: false
        },
        path: {
            type: String,
            required: false
        },

    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, retainKeyOrder: true}
);

// Remove version from result.
MediaModulesSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
        return ret;
    }
});

module.exports = MediaModulesSchema;

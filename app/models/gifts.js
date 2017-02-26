const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const GiftsModulesSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Gift title is required']
        },
        description: {
            type: String
        },
        _category: {
            type: [Schema.Types.ObjectId],
            ref: 'Categories'
        }
    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, retainKeyOrder: true}
);

// Validates ObjectId references
GiftsModulesSchema.plugin(idvalidator);

// Remove version from result.
GiftsModulesSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
    }
});

module.exports = GiftsModulesSchema;

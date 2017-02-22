const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const GiftsModulesSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Module name is required'],
            unique: false,
            dropDups: true,
        },
        description: {
            type: String,
            required: false,
        },
        _category: {
            type: [Schema.Types.ObjectId],
            ref: 'Categories'
        }
    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, retainKeyOrder: true}
);

// Validates ObjectId references
GiftsModulesSchema.plugin(idvalidator);

module.exports = GiftsModulesSchema;

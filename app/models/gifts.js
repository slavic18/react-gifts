var mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

// get the list of popular Rooms modules in categories.
var GiftsModulesSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: 'Categories'
        }
    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, retainKeyOrder: true}
);

// Validates ObjectId references
RoomsModulesSchema.plugin(idvalidator);
module.exports = GiftsModulesSchema;

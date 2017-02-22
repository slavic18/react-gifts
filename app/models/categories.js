var mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

// get the list of popular Messages modules in categories.
var CategoriesModulesSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, retainKeyOrder: true}
);


// Validates ObjectId references
MessagesModulesSchema.plugin(idvalidator);

module.exports = CategoriesModulesSchema;

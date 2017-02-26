const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const CategoriesModulesSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        _parent: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        // _vocabulary: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Vocabulary',
        //     required: true
        // }
    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, retainKeyOrder: true}
);


// Validates ObjectId references
CategoriesModulesSchema.plugin(idvalidator);

module.exports = CategoriesModulesSchema;

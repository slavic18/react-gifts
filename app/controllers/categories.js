const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const mep = require('mongoose-error-parse');
const CategoriesSchema = require('../models/categories');
const CategoriesModel = mongoose.model('Categories', CategoriesSchema);

const CategoriesController = {
    // create new category.
    create: function (req, res) {
        let newCategory = new CategoriesModel();
        newCategory = _h.fill(req, newCategory);
        newCategory.save(function (err, data) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json({success: true, message: 'Category created!', category: data});
        });
    },
    // get list of all categories.
    get: function (req, res) {
        CategoriesModel.find().sort({_id: 'descending'}).populate('_vocabulary').find(function (err, categories) {
            categories = categories || [];
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(categories);
        });
    },
    // get one category.
    getById: function (req, res) {
        CategoriesModel.findById(req.params.category_id).find(function (err, category) {
            category = category | [];
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(category);
        });
    },
};

module.exports = CategoriesController;

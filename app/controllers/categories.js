const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const mep = require('mongoose-error-parse');
const fs = require('fs');
const CategoriesSchema = require('../models/categories');
const CategoriesModel = mongoose.model('Categories', CategoriesSchema);
const _ = require('lodash');

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
    // edit category.
    edit: function (req, res) {
        var newCategoryModel = new CategoriesModel() ,
            newCategory = _h.fill(req, newCategoryModel),
            _id = newCategory._id;

        if (!req.body._thumbnail) {
            newCategory = _.assign({'_thumbnail': undefined}, newCategory._doc);
        }
        CategoriesModel.findOneAndUpdate({_id}, newCategory, {new: true, upsert: true}, function (err, data) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json({success: true, message: 'Category updated!', category: data});
        });
    },
    // get list of all categories.
    get: function (req, res) {
        console.log(req);
        CategoriesModel.find().sort({_id: 'descending'}).populate('_thumbnail').find(function (err, categories) {
            categories = categories || [];
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(categories);
        });
    },
    // get one category.
    getById: function (req, res) {
        console.log(req.params);
        CategoriesModel.findById(req.params.category_id).populate('_thumbnail').find(function (err, category) {
            category = category || [];
            console.log(category);
            if (err) {
                res.json({success: false, error: mep.text(err)});
                return;
            }
            res.json({category: category[0]});
        });
    },
};

module.exports = CategoriesController;

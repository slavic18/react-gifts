const config = require('../configs/config');
const _h = require('../tools/helper');
const mongoose = require('mongoose');
const CategoriesSchema = require('../models/categories');
const CategoriesModel = mongoose.model('Categories', CategoriesSchema);
const _ = require('lodash');

let CategoriesController = {
    /**
     *  create new user
     *  params array
     *  login, password, role = 'administrator', project_ids = [], online: false, name: login
     *
     */
    create: function (req, res) {
        let newCategory = new CategoriesModel();   // create a new instance of the Category Schema model
        newCategory = _h.fill(req, newCategory);  // set the newCategory data (comes from the request)
        newCategory.save(function (err, data) {
            if (err) {
                res.json({success: false, error: err.message});
            }
            res.json({success: true, message: 'Category created!', category: data});
        });
    },
    // get list of all categories
    get: function (req, res) {
        CategoriesModel.find().sort({_id: 'descending'}).find(function (err, categories) {
            if (err) res.send(err);
            res.json(categories);
        });
    },
};

module.exports = CategoriesController;

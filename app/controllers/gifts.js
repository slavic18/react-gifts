const _h = require('../tools/helper');
const mongoose = require('mongoose');
const GiftsSchema = require('../models/gifts');
const GiftsModel = mongoose.model('Gifts', GiftsSchema);
const CategoryController = require('../controllers/categories');

let giftsController = {
    create: function (req, res) {
        let newGift = new GiftsModel();   // create a new instance of the Category Schema model
        newGift = _h.fill(req, newGift);  // set the newCategory data (comes from the request)
        newGift.save(function (err, data) {
            if (err) {
                res.json({success: false, error: err.message});
            }
            res.json({success: true, message: 'Gift created!', category: data});
        });
    },
    // get list of all categories
    get: function (req, res) {
        GiftsModel.find().sort({_id: 'descending'}).find(function (err, gifts) {
            if (err) res.send(err);
            res.json(gifts);
        });
    },
}

module.exports = giftsController;

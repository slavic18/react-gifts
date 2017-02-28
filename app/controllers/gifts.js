const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const mep = require('mongoose-error-parse');
const GiftsSchema = require('../models/gifts');
const GiftsModel = mongoose.model('Gifts', GiftsSchema);

const giftsController = {
    // create new gift.
    create: function (req, res) {
        let newGift = new GiftsModel();
        newGift = _h.fill(req, newGift);
        newGift.save(function (err, data) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json({success: true, message: 'Gift created!', gift: data});
        });
    },
    // get list of all gifts.
    get: function (req, res) {
        GiftsModel.find().sort({_id: 'descending'}).find(function (err, gifts) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(gifts);
        });
    },
    // get one category.
    getById: function (req, res) {
        GiftsModel.findById(req.params.gift_id).find(function (err, gift) {
            gift = (!gift) ? [] : gift;
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(gift);
        });
    },
    getByCategory: function (req, res) {
        if (req.query.category_id) {
            GiftsModel.find({_category: req.query.category_id}).find(function (err, gifts) {
                gifts = (!gifts) ? [] : gifts;
                if (err) {
                    res.json({success: false, error: mep.text(err)});
                }
                res.json(gifts);
            });
        }else {
            res.json([]);
        }

    }
}

module.exports = giftsController;

const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const mep = require('mongoose-error-parse');
const GiftsSchema = require('../models/gifts');
const GiftsModel = mongoose.model('Gifts', GiftsSchema);
const _ = require("lodash");
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
        GiftsModel.find().sort({_id: 'descending'}).populate('_thumbnail').populate('_category').find(function (err, gifts) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            gifts = gifts || [];
            res.json(gifts);
        });
    },
    // get one category.
    getById: function (req, res) {
        GiftsModel.findById(req.params.gift_id).populate('_category').populate('_thumbnail').exec(function (err, gift) {
            gift = gift || {};
            if (err) {
                res.json({success: false, error: mep.text(err)});
                return;
            }
            console.log(gift);
            res.json({gift: gift});
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
        } else {
            res.json([]);
        }
    },

    // edit category.
    edit: function (req, res) {
        var newGiftsModel = new GiftsModel(),
            newGift = _h.fill(req, newGiftsModel),
            _id = newGift._id;

        if (!req.body._thumbnail) {
            newGift = _.assign({'_thumbnail': undefined}, newGift._doc);
        }
        if (!req.body._category) {
            newGift = _.assign({'_category': undefined}, newGift._doc);
        }
        console.log('new gift', newGift);
        GiftsModel.findOneAndUpdate({_id}, newGift, {new: true, upsert: true}, function (err, data) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json({success: true, message: 'Gift updated!', gift: data});
        });
    },
    delete: function (req, res) {
        let gifts = req.body.gifts;

        if (typeof gifts == 'undefined') {
            res.json({success: false, error: 'Empty categories list'});
        }
        if (typeof gifts == 'string') {
            gifts = [gifts];
        }
        GiftsModel.remove({_id: {'$in': gifts}}, (err, items) => {
            if (err) {
                res.json({success: false, error: mep.text(err)});
                return;
            }

            res.json({success: true, gifts: gifts});
        });
    },

}

module.exports = giftsController;

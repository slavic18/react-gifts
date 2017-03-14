const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const mep = require('mongoose-error-parse');
const MediaSchema = require('../models/media');
const MediaModel = mongoose.model('Media', MediaSchema);

const MediaController = {
    // create new Media.
    create: function (req, res) {
        let newMedia = new MediaModel();
        newMedia = _h.fill(req, newMedia);
        newMedia.save(function (err, data) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json({success: true, message: 'Media created!', Media: data});
        });
    },
    // get list of all Media.
    get: function (req, res) {
        MediaModel.find().sort({_id: 'descending'}).find(function (err, Media) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(Media);
        });
    },
    // get one category.
    getById: function (req, res) {
        MediaModel.findById(req.params.Media_id).find(function (err, Media) {
            Media = (!Media) ? [] : Media;
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(Media);
        });
    },
}

module.exports = MediaController;

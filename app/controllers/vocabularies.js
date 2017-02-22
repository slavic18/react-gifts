const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const VocabulariesSchema = require('../models/vocabularies');
const VocabulariesModel = mongoose.model('Vocabularies', VocabulariesSchema);

const VocabulariesController = {
    // create new vocabulary
    create: function (req, res) {
        let newVocabulary = new VocabulariesModel();
        newVocabulary = _h.fill(req, newVocabulary);
        newVocabulary.save(function (err, data) {
            if (err) {
                res.json({success: false, error: err.message});
            }
            res.json({success: true, message: 'Vocabulary created!', vocabulary: data});
        });
    },
    // get list of all vocabularies
    get: function (req, res) {
        VocabulariesModel.find().sort({_id: 'descending'}).find(function (err, vocabularies) {
            vocabularies = (!vocabularies) ? [] : vocabularies;
            if (err) res.send(err);
            res.json(vocabularies);
        });
    },
    // get one vocabulary
    getOne: function (req, res) {
        VocabulariesModel.findById(req.params.vocabulary_id).find(function (err, vocabulary) {
            vocabulary = (!vocabulary) ? [] : vocabulary;
            if (err) res.send(err);
            res.json(vocabulary);
        });
    },
};

module.exports = VocabulariesController;

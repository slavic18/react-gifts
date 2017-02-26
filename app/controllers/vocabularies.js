const _h = require('mongoose-api-helper');
const mongoose = require('mongoose');
const mep = require('mongoose-error-parse');
const VocabulariesSchema = require('../models/vocabularies');
const VocabulariesModel = mongoose.model('Vocabularies', VocabulariesSchema);
const TranslatedField = require('../models/translations');
const TranslatedModel = mongoose.model('Translation', TranslatedField);

const VocabulariesController = {
    // create new vocabulary
    create: function (req, res) {
        let newVocabulary = new VocabulariesModel();
        newVocabulary = _h.fill(req, newVocabulary, { Model: TranslatedModel });
        newVocabulary.save(function (err, data) {
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json({success: true, message: 'Vocabulary created!', vocabulary: data});
        });
    },
    // get list of all vocabularies
    get: function (req, res) {
        VocabulariesModel.find().populate('name').sort({_id: 'descending'}).find(function (err, vocabularies) {
            vocabularies = (!vocabularies) ? [] : vocabularies;
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(vocabularies);
        });
    },
    // get one vocabulary
    getById: function (req, res) {
        VocabulariesModel.findById(req.params.vocabulary_id).find(function (err, vocabulary) {
            vocabulary = (!vocabulary) ? [] : vocabulary;
            if (err) {
                res.json({success: false, error: mep.text(err)});
            }
            res.json(vocabulary);
        });
    },
};

module.exports = VocabulariesController;

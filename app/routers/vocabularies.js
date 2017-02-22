const VocabulariesSchema = require('../models/vocabularies');
const VocabulariesController = require('../controllers/vocabularies');

module.exports = {
    beforeMiddleware: function(router) {
        router.route('/vocabularies')
            .get(function (req, res) {
                VocabulariesController.get(req, res);
            });
        router.route('/vocabularies/:vocabulary_id')
            .get(function (req, res) {
                VocabulariesController.getById(req, res);
            });
    },
    afterMiddleware: function(router) {
        router.route('/vocabularies')
            .post(function (req, res) {
                VocabulariesController.create(req, res);
            });
    }
}

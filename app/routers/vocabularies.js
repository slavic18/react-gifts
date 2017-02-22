const VocabulariesSchema = require('../models/vocabularies');
const VocabulariesController = require('../controllers/vocabularies');

module.exports = {
    beforeMiddleware: function(router) {
        router.route('/vocabularies')
            .get(function (req, res) {
                VocabulariesController.get(req, res);
            });
    },
    middleware: function(router) {

    },
    afterMiddleware: function(router) {
        router.route('/vocabularies')
            .post(function (req, res) {
                VocabulariesController.create(req, res);
            });
    }
}

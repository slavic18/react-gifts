const GiftsSchema = require('../models/gifts');
const GiftsController = require('../controllers/gifts');

module.exports = {
    beforeMiddleware: function(router) {
        router.route('/gifts')
            .get(function (req, res) {
                GiftsController.get(req, res);
            });
    },
    middleware: function(router) {

    },
    afterMiddleware: function(router) {
        router.route('/gifts')
            .post(function (req, res) {
                GiftsController.create(req, res);
            });
    }
}

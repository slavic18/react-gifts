const GiftsSchema = require('../models/gifts');
const GiftsController = require('../controllers/gifts');

module.exports = {
    beforeMiddleware: function(router) {
        router.route('/gifts')
            .get(function (req, res) {
                GiftsController.get(req, res);
            });
        router.route('/gifts/:gift_id')
            .get(function (req, res) {
                GiftsController.getById(req, res);
            });
        router.route('/gifts')
            .post(function (req, res) {
                GiftsController.create(req, res);
            });
    },
    afterMiddleware: function(router) {

    }
}

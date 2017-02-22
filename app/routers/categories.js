const CategoriesSchema = require('../models/categories');
const CategoriesController = require('../controllers/categories');

module.exports = {
    beforeMiddleware: function(router) {
        router.route('/categories')
            .get(function (req, res) {
                CategoriesController.get(req, res);
            });
    },
    middleware: function(router) {

    },
    afterMiddleware: function(router) {
        router.route('/categories')
            .post(function (req, res) {
                CategoriesController.create(req, res);
            });
    }
}

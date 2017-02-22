const CategoriesSchema = require('../models/categories');
const CategoriesController = require('../controllers/categories');

module.exports = {
    beforeMiddleware: function(router) {
        router.route('/categories')
            .get(function (req, res) {
                CategoriesController.get(req, res);
            });
        router.route('/categories/:category_id')
            .get(function (req, res) {
                CategoriesController.getById(req, res);
            });
    },
    afterMiddleware: function(router) {
        router.route('/categories')
            .post(function (req, res) {
                CategoriesController.create(req, res);
            });
    }
}

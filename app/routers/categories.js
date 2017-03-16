const CategoriesSchema = require('../models/categories');
const CategoriesController = require('../controllers/categories');

module.exports = {
    beforeMiddleware: function (router) {
        /**
         * @api {get} /categories get list of all categories
         * @apiName GetCategories
         * @apiGroup Category
         *
         * @apiSuccess {Object[]} category List of categories.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     [
         *        {
         *          "_id": "58afe25f3c5fed19aad3009e",
         *          "order": 1,
         *          "description": "Test description",
         *          "name": "Test name"
         *        }
         *      ]
         *
         * @apiUse MongooseError
         */
        router.route('/categories')
            .post(function (req, res) {
                CategoriesController.create(req, res);
            });

        router.route('/categories/edit')
            .post(function (req, res) {
                CategoriesController.edit(req, res);
            });
        router.route('/categories/delete')
            .post(function (req, res) {
                CategoriesController.delete(req, res);
            });
        router.route('/categories')
            .get(function (req, res) {
                CategoriesController.get(req, res);
            });

        /**
         * @api {get} /categories/:category_id get list of all categories
         * @apiName GetCategoryById
         * @apiGroup Category
         *
         * @apiParam {String} category_id Category unique ID.
         *
         * @apiSuccess {String} _id Category unique ID.
         * @apiSuccess {String} name Category name.
         * @apiSuccess {String} description Category description.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          "_id": "58afe25f3c5fed19aad3009e",
         *          "__v": 0,
         *          "order": 1,
         *          "description": "Test description",
         *          "name": "Test name"
         *     }
         *
         * @apiUse MongooseError
         */
        router.route('/categories/:category_id')
            .get(function (req, res) {
                CategoriesController.getById(req, res);
            });


        /**
         * @api {post} /categories create a new category
         * @apiName CreateCategory
         * @apiGroup Category
         *
         * @apiParam {Object[]} name Array of tranlated field objects
         * @apiParam {String} name.text Category name
         * @apiParam {String} [name.lang] Name language
         * @apiParam {Object[]} [description] Array of tranlated field objects
         * @apiParam {String} [description.text] Category description
         * @apiParam {String} [description.lang] Description language
         * @apiParam {String} [_parent] Parent category unique ID.
         *
         * @apiParamExample Request-Example:
         *     {
         *          name[0][text] : "New category",
         *          description[0][text] : "Category description",
         *          description[0][lang] : "en",
         *          _parent : "58afe25f3c5fed19aad3009e"
         *     }
         *
         * @apiSuccess {Boolean} success Returns request success status.
         * @apiSuccess {String} message Successfull message.
         * @apiSuccess {Object} category Newly created category.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          success : true,
         *          message : "Category created!",
         *          category : {
         *              "_id": "58afe25f3c5fed19aad3009e",
         *              "__v": 0,
         *              "order": 1,
         *              "title": "Test name"
         *              "description": "Test description",
         *          }
         *     }
         *
         * @apiUse MongooseError
         */
    },
    afterMiddleware: function (router) {

    }
}

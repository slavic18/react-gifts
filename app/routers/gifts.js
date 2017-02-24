const GiftsSchema = require('../models/gifts');
const GiftsController = require('../controllers/gifts');

module.exports = {
    beforeMiddleware: function(router) {
        /**
         * @api {get} /gifts get list of all gifts
         * @apiName GetGifts
         * @apiGroup Gifts
         *
         * @apiSuccess {Object[]} category List of Gift object.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     [
         *        {
         *          "_id": "58afe25f3c5fed19aad3009e",
         *          "title": "Test name",
         *          "description": "Test description",
         *          "_category": "58afe25f3c5fed19aad3009e"
         *        }
         *      ]
         *
         * @apiUse MongooseError
         */
        router.route('/gifts')
            .get(function (req, res) {
                GiftsController.get(req, res);
            });

        /**
         * @api {get} /gifts/:gift_id get gift by ID
         * @apiName GetGiftById
         * @apiGroup Gifts
         *
         * @apiParam {String} gift_id Gift unique ID.
         *
         * @apiSuccess {String} _id Gift unique ID.
         * @apiSuccess {String} title Gift name.
         * @apiSuccess {String} description Gift description.
         * @apiSuccess {String} category Gift category unique ID.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          "_id": "58afe25f3c5fed19aad3009e",
         *          "title": "Test name",
         *          "description": "Test description",
         *          "_category": "58afe25f3c5fed19aad3009e"
         *     }
         *
         * @apiUse MongooseError
         */
        router.route('/gifts/:gift_id')
            .get(function (req, res) {
                GiftsController.getById(req, res);
            });

        /**
         * @api {post} /gifts create a new gift
         * @apiName CreateGift
         * @apiGroup Gifts
         *
         * @apiParam {String} title Gift name.
         * @apiParam {String} [description] Gift description.
         * @apiParam {String} _category Gift category unique ID.
         *
         * @apiParamExample Request-Example:
         *     {
         *          title : "New gift",
         *          description : "Gift description",
         *          _category : "58afe25f3c5fed19aad30093"
         *     }
         *
         * @apiSuccess {Boolean} success Returns request success status.
         * @apiSuccess {String} message Successfull message.
         * @apiSuccess {Object} gift Newly created gift.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *          success : true,
         *          message : "Gift created!",
         *          gift : {
         *              "_id": "58afe25f3c5fed19aad3009e",
         *              "title": "New gift",
         *              "description": "Gift description",
         *              "_category": "58afe25f3c5fed19aad30093"
         *          }
         *     }
         *
         * @apiUse MongooseError
         */
        router.route('/gifts')
            .post(function (req, res) {
                GiftsController.create(req, res);
            });
    },
    afterMiddleware: function(router) {

    }
}

/**
 * @apiDefine MongooseError
 *
 * @apiError {Boolean} success Returns request success status.
 * @apiError {String} message Successfull message.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       success: false,
 *       error: err.message
 *     }
 */

// create our router
let appRouter = {
    routs: [
        'categories',
        'vocabularies',
        'gifts',
        'users'
    ],
    expressRouter: {},
    routers: [],
    init: function(express) {
        this.expressRouter = express.Router();
        this.routers = this.routs.map(function(rout) {
            return require('./' + rout);
        });

        this.processRoutes('beforeMiddleware', 'middleware', 'afterMiddleware');

        // return new router.
        return this.expressRouter;
    },
    processRoutes: function(...args) {
        for (arg in arguments) {
            let type = arguments[arg];
            for (var i = 0, len = this.routers.length; i < len; i++) {
                if (this.routers[i].hasOwnProperty(type)) {
                    this.routers[i][type](this.expressRouter);
                }
            }
        }
    }
}

module.exports = appRouter;

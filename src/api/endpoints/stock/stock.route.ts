import { expressValidator } from '../../validator';
import { StockController } from './stock.controller';
import {Db} from 'core/db';
import {BackendConfig} from 'core/config';
import {Router} from 'express';
import {LoggerInstance} from 'winston';
import {injectable} from 'inversify';
import {check, body} from 'express-validator/check';



@injectable()
export class StockRoute {
    constructor(
        private _stockController: StockController) {}

    setupRoutes(router: Router) {

        /**
         *
         * @api {GET} /stock Find stocks
         * @apiName Find stocks
         * @apiGroup Stock
         * @apiDescription Find all the stocks
         *
         * @apiSuccess (200) {number} id
         * @apiSuccess (200) {string} name
         * @apiSuccess (200) {number} currentPrice
         * @apiSuccess (200) {Date} lastUpdate
         *
         * * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         * [
         *  {
         *      "id": 1,
         *      "name": "stock 1",
         *      "currentPrice": 12,
         *      "lastUpdate": "2017-09-23T15:19:16.647Z"
         *  }
         * ]
         */
        router.get('/stock', this._stockController.findAllAction);

        /**
        *
        * @api {GET} /stock/:id Find a stock
        * @apiName Find a stock
        * @apiGroup Stock
        * @apiDescription Find a stock given its id
        *
        * @apiParam id id of the stock
        *
        * @apiSuccess (200) {number} id
        * @apiSuccess (200) {string} name
        * @apiSuccess (200) {number} currentPrice
        * @apiSuccess (200) {Date} lastUpdate
        *
        * * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *  {
        *      "id": 1,
        *      "name": "stock 1",
        *      "currentPrice": 12,
        *      "lastUpdate": "2017-09-23T15:19:16.647Z"
        *  }
        */
        router.get('/stock/:id', this._stockController.findOneAction);

        /**
        *
        * @api {PUT} /stock/:id Update stock price
        * @apiName Update stock price
        * @apiGroup Stock
        * @apiDescription Update stock price
        *
        * @apiParam id id of the stock
        * @apiParam currentPrice {number} new price
        *
        * @apiSuccess (200) {number} id
        * @apiSuccess (200) {string} name
        * @apiSuccess (200) {number} currentPrice
        * @apiSuccess (200) {Date} lastUpdate
        *
        * * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *  {
        *      "id": 1,
        *      "name": "stock 1",
        *      "currentPrice": 12,
        *      "lastUpdate": "2017-09-23T15:19:16.647Z"
        *  }
        */
        router.put('/stock/:id', [
            body('currentPrice').exists().isNumeric(),
            expressValidator,
            this._stockController.updateAction
        ]);

        /**
        *
        * @api {POST} /stock Create a new stock
        * @apiName Create a new stock
        * @apiGroup Stock
        * @apiDescription Create a new stock
        *
        * @apiParam currentPrice {number} new price
        * @apiParam name {string} name of the stock
        *
        * @apiSuccess (200) {number} id
        * @apiSuccess (200) {string} name
        * @apiSuccess (200) {number} currentPrice
        * @apiSuccess (200) {Date} lastUpdate
        *
        * * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *  {
        *      "id": 1,
        *      "name": "stock 1",
        *      "currentPrice": 12,
        *      "lastUpdate": "2017-09-23T15:19:16.647Z"
        *  }
        */
        router.post('/stock', [
            body('currentPrice').isNumeric(),
            body('name').exists(),
            expressValidator,
            this._stockController.createAction
        ]);

    }
}
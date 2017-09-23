import { Logger } from 'core/log';
import { ApiError, ErrorCode } from 'core/errorCodes';
import { Db } from 'core/db';
import { BackendConfig } from 'core/config';
import * as winston from 'winston';
import {injectable} from 'inversify';

@injectable()
export class StockController {
    constructor(
        private _config: BackendConfig,
        private _logger: Logger,
        private _db: Db,
    ) {
        this.findAllAction = this.findAllAction.bind(this);
        this.findOneAction = this.findOneAction.bind(this);
        this.updateAction = this.updateAction.bind(this);
        this.createAction = this.createAction.bind(this);
    }

    /**
     * Find all stocks
     *
     * @param {any} req
     * @param {any} res
     * @param {any} next
     *
     * @memberOf UserController
     */
    findAllAction(req, res, next) {
        try {
            res.send(this._db.models.Stock.findAll());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Find one stock
     *
     * @param {any} req
     * @param {any} res
     * @param {any} next
     *
     * @memberOf StockController
     */
    findOneAction(req, res, next) {
        try {
            let id = parseInt(req.params.id);

            let stock = this._db.models.Stock.findOneById(id);

            if (!stock) {
                throw new ApiError(ErrorCode.not_found);
            }

            res.send(stock);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Update a stock's price
     *
     * @param {any} req
     * @param {any} res
     * @param {any} next
     *
     * @memberOf StockController
     */
    updateAction(req, res, next) {
        try {
            let price = req.body.currentPrice;
            let id = parseInt(req.params.id);

            let stock = this._db.models.Stock.updatePrice(id, price);

            if (!stock) {
                throw new ApiError(ErrorCode.not_found);
            }

            res.send(stock);

        } catch (err) {
            next(err);
        }
    }

    /**
     * Create a new stock
     *
     * @param {any} req
     * @param {any} res
     * @param {any} next
     *
     * @memberOf StockController
     */
    createAction(req, res, next) {
        try {
            let data = req.body;

            let stock = this._db.models.Stock.create(data);

            res.send(stock);
        } catch (err) {
            next(err);
        }
    }

}
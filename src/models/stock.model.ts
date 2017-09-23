// n.b. this is a proof of concept of a model
// It's not very performant, expecially when searching by id.
// adding a built-in index on id field will help

import { BackendConfig } from '../core/config';
import { injectable } from 'inversify';
import * as _ from 'lodash';

export interface StockInstance {
    id?: number;
    name?: string;
    currentPrice?: number;
    lastUpdate?: Date;
}


@injectable()
export class StockModel {
    /**
     * auto incremental ids of stock. This tracks the highest id stored
     *
     * @private
     *
     * @memberOf StockModel
     */
    private _lastIndex = 0;
    /**
     * stock array
     *
     * @private
     * @type {StockInstance[]}
     * @memberOf StockModel
     */
    private _stocks: StockInstance[] = [];
    /**
     * Find all stored stocks
     *
     * @returns {StockInstance[]}
     *
     * @memberOf StockModel
     */
    findAll(): StockInstance[] {
        return this._stocks;
    }
    /**
     *
     *
     * @param {number} id
     * @returns {StockInstance}
     *
     * @memberOf StockModel
     */
    findOneById(id: number): StockInstance {
        return _.keyBy(this._stocks, 'id')[id];
    }
    /**
     * Update the price of an existant stock
     *
     * @param {number} id
     * @param {number} price
     * @returns {StockInstance}
     *
     * @memberOf StockModel
     */
    updatePrice(id: number, price: number): StockInstance {
        let stock = _.keyBy(this._stocks, 'id')[id];

        if (!stock) {
            return null;
        }

        stock.currentPrice = price;
        stock.lastUpdate = new Date();

        return stock;
    }
    /**
     * Create a new stock
     *
     * @param {*} data
     * @returns {StockInstance}
     *
     * @memberOf StockModel
     */
    create(data: any): StockInstance {

        if (this.findOneById(this._lastIndex + 1)) {
            throw new Error('Trying to create an already existant id');
        }

        let stock: StockInstance = {
            id: this._lastIndex + 1,
            name: data.name || '',
            currentPrice: data.currentPrice || 0,
            lastUpdate: new Date()
        };

        this._stocks.push(stock);

        this._lastIndex++;

        return stock;
    }
    /**
     * Delete all the stocks
     *
     *
     * @memberOf StockModel
     */
    destroyAll() {
        this._stocks = [];
        this._lastIndex = 0;
    }
    constructor(
        private _config: BackendConfig
    ) {}
}
import { StockModel } from '../models/stock.model';
import {injectable} from 'inversify';
import {Logger} from 'core/log';
import {BackendConfig} from 'core/config';
import * as winston from 'winston';

export interface Models {
    Stock: StockModel;
}

@injectable()
export class Db {
    models: Models;
    constructor(
        private _config: BackendConfig,
        private _log: Logger,
        private _stockModel: StockModel
    ) {
        this.models = {
            Stock: this._stockModel
        };
    }

    /**
     * Delete all the data
     *
     *
     * @memberOf Db
     */
    clearDb() {
        this._stockModel.destroyAll();
    }

}
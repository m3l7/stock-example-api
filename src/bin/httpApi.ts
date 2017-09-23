require('app-module-path').addPath(__dirname + '/../');
import { Db } from '../core/db';
import {ErrorCode, ApiError} from 'core/errorCodes';
import {Logger} from 'core/log';
import {BackendConfig} from 'core/config';
import * as configjs from 'config';
import * as errorHandler from 'utils/errorHandling';
import {Api} from 'api/api';
import {inversifyContainer} from 'core/inversify';

// setup unhandled error handling
let log: Logger;
process.on('unhandledRejection', handleRejections.bind(this));
process.on('uncaughtException', handleRejections.bind(this));

// inject runtime configs (from config/{env}.json) to Config class
let conf: any = {};
if (configjs.has('api')) {
    conf = Object.assign({}, configjs.get('api'));
}
let backendConfig = inversifyContainer.get<BackendConfig>(BackendConfig);
backendConfig.setConfig(conf);
log = inversifyContainer.get<Logger>(Logger);
let db = inversifyContainer.get<Db>(Db);
let server = inversifyContainer.get<Api>(Api);

(async () => {
    // setup the server
    await server.setup();

    // load test data into memory
    let stocks = require('../fixtures/stocks.fixtures.js');
    for (let stock of stocks) {
        db.models.Stock.create(stock);
    }

    // start the server
    server.listen();
})();


function handleRejections(err) {
    errorHandler.handleRejections(err, log);
}
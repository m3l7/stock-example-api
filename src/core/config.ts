import * as _ from 'lodash';
import {injectable} from 'inversify';
import 'reflect-metadata';

let defaultConf = {
    port: 27001,
    log: {
        http: true,
        error: true,
        level: 'info',
        timestamp: true
    },
    debug: {
        sendErrorsToClient: false,
        sendStackToClient: false
    }
};

/**
 * Configuration service
 *
 * @export
 * @class ApiConfig
 */
@injectable()
export class BackendConfig {
    /**
     * Port which the server will listen to
     *
     * @type {number}
     * @memberOf ApiConfig
     */
    port: number;
    /**
     * turn on/off http and error loggin and set logging level
     *
     * @type {{
     *         http?: boolean;
     *         error?: boolean;
     *         level?: string;
     *         timestamp?: boolean;
     *     }}
     * @memberOf ApiConfig
     */
    log: {
        http: boolean;
        error: boolean;
        level: string;
        timestamp: boolean;
    };
    debug: {
        sendErrorsToClient: boolean;
        sendStackToClient: boolean;
    };
    constructor() {
        // inject default config
        this.setConfig({});
    }

    /**
     * set configuration data with fallback to default config
     *
     * @param {Object} conf
     *
     * @memberOf ApiConfig
     */
    setConfig(conf: Object) {
        let c = _.merge(defaultConf, conf);
        this.port = c.port;
        this.log = c.log;
        this.debug = c.debug;
    }
}
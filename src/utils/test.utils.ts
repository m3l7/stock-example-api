import { BackendConfig } from '../core/config';
import { inversifyContainer } from '../core/inversify';
import { Db } from 'core/db';
import { Api } from 'api/api';
import * as configjs from 'config';
import * as _ from 'lodash';
import * as Bluebird from 'bluebird';

export interface TestGlobals {
    db: Db;
    url: string;
    api: Api;
}

export async function init_e2e(): Promise<TestGlobals> {

    // inject runtime configs (from config/{env}.json) to Config class
    let conf: any = {};
    if (configjs.has('api')) {
        conf = Object.assign({}, configjs.get('api'));
    }

    let backendConfig = inversifyContainer.get<BackendConfig>(BackendConfig);
    backendConfig.setConfig(conf);
    let db = inversifyContainer.get<Db>(Db);

    // start the server
    let api = inversifyContainer.get<Api>(Api);
    await api.setup();
    await api.listen();

    return {
        db,
        url: 'http://localhost:' + backendConfig.port + '/',
        api
    };
}


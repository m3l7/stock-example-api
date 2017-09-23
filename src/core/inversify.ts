// configuration for dependency injection with inversify.js
import { StockController } from '../api/endpoints/stock/stock.controller';
import { StockRoute } from '../api/endpoints/stock/stock.route';
import { StockModel } from '../models/stock.model';
import {ResponseService} from 'core/response';
import {RouterFactory} from 'api/route';
import {Db} from 'core/db';
import {Logger} from 'core/log';
import {BackendConfig} from 'core/config';
import {Api} from 'api/api';
import {Container} from 'inversify';
import 'reflect-metadata';

export let inversifyContainer = new Container();

inversifyContainer.bind<Api>(Api).toSelf();
inversifyContainer.bind<BackendConfig>(BackendConfig).toSelf().inSingletonScope();
inversifyContainer.bind<Logger>(Logger).toSelf().inSingletonScope();
inversifyContainer.bind<Db>(Db).toSelf().inSingletonScope();
inversifyContainer.bind<StockModel>(StockModel).toSelf().inSingletonScope();
inversifyContainer.bind<RouterFactory>(RouterFactory).toSelf();
inversifyContainer.bind<ResponseService>(ResponseService).toSelf();
inversifyContainer.bind<StockRoute>(StockRoute).toSelf();
inversifyContainer.bind<StockController>(StockController).toSelf();
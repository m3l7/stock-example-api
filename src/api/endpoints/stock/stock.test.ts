require('app-module-path').addPath(__dirname + '/../../../');
import 'mocha';
import * as Request from 'supertest';
import * as testUtils from 'utils/test.utils';
import * as _ from 'lodash';
require('expect.js');
import * as chai from 'chai';

let expect = chai.expect;

let testGlobals: testUtils.TestGlobals;

describe('Stock', () => {
    before(async () => {
        // init server, db
        let t = await testUtils.init_e2e();
        testGlobals = t;
    });
    after(async () => {
        await testGlobals.api.close();
    });
    beforeEach(async () => {
        await testGlobals.db.clearDb();

        // load test datas
        let stocks = require('./stock.test.data.js');
        for (let stock of stocks) {
            testGlobals.db.models.Stock.create(stock);
        }
    });
    describe('findAll', () => {
        it('should find all stocks', async () => {
            let res = await Request(testGlobals.url)
                .get('stock')
                .expect(200);

            expect(res.body).to.have.length(4);
            expect(res.body.map(stock => stock.id)).to.have.same.members([1, 2, 3, 4]);
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('name');
            expect(res.body[0]).to.have.property('currentPrice');
            expect(res.body[0]).to.have.property('lastUpdate');
        });
    });
    describe('findOne', () => {
        it('should find a stock', async () => {
            let res = await Request(testGlobals.url)
                .get('stock/2')
                .expect(200);

            expect(res.body.id).to.equal(2);
            expect(res.body.name).to.equal('stock 2');
            expect(res.body.currentPrice).to.equal(11);
        });
        it('shouldn\'t find a non existent stock', async () => {
            let res = await Request(testGlobals.url)
                .get('stock/5')
                .expect(404);

        });
    });
    describe('update', () => {
        it('should update a stock currentPrice', async () => {
            let res = await Request(testGlobals.url)
                .put('stock/2')
                .send({
                    currentPrice: 100
                })
                .expect(200);

            expect(res.body.id).to.equal(2);
            expect(res.body.currentPrice).to.equal(100);
        });
        it('should not update fields other than currentPrice', async () => {
            let now = new Date();
            let res = await Request(testGlobals.url)
                .put('stock/2')
                .send({
                    id: 10,
                    name: 'stock updated',
                    lastUpdate: now,
                    currentPrice: 100
                })
                .expect(200);

            expect(res.body.id).to.equal(2);
            expect(res.body.name).to.equal('stock 2');
            expect(res.body.lastUpdate).to.not.equal(now);
        });
        it('should not update currentPrice if it is not a valid number', async () => {
            let res = await Request(testGlobals.url)
                .put('stock/2')
                .send({
                    currentPrice: 'string'
                })
                .expect(400);

            expect(res.body.code).to.equal(10001);
        });
    });
    describe('create', () => {
        it('should create a new stock', async () => {
            let res = await Request(testGlobals.url)
                .post('stock')
                .send({
                    name: 'new stock',
                    currentPrice: 200
                })
                .expect(200);

            expect(res.body.id).to.be.ok;
            expect(res.body.currentPrice).to.equal(200);
            expect(res.body.lastUpdate).to.be.ok;
            expect(res.body.name).to.equal('new stock');
        });
        it('should not create a stock when name is not provided', async () => {
            let res = await Request(testGlobals.url)
                .post('stock')
                .send({
                    currentPrice: 200
                })
                .expect(400);

            expect(res.body.code).to.equal(10001);
        });
        it('should not create a stock when currentPrice is not a valid number', async () => {
            let res = await Request(testGlobals.url)
                .post('stock')
                .send({
                    currentPrice: 'string',
                    name: 'new stock'
                })
                .expect(400);

            expect(res.body.code).to.equal(10001);
        });
    });
});

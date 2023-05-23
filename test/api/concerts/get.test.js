const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model.js')
const server = require('../../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {

        const testData = [
            {  performer: 'Tom', genre: 'disco', price: 5, day: 3, image: 'test'},
            {  performer: 'Jerry', genre: 'pop', price: 10, day: 2, image: 'test'}
        ];

        for(let item of testData) {
            const data = new Concert({performer: item.performer, genre: item.genre, price: item.price, day: item.day, image: item.image})
            await data.save();
        }
      });

      it('/ should return performer by :performer', async () => {

        const res = await request(server).get('/api/concerts/performer/Tom');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
      });

      it('/ should return genre by :genre', async () => {

        const res = await request(server).get('/api/concerts/genre/disco');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
      });

      it('/ should return prices by :price', async () => {

        const res = await request(server).get('/api/concerts/price/2/12');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
      });

      it('/ should return day by :day', async () => {

        const res = await request(server).get('/api/concerts/day/2');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
      });

      after(async () => {
        await Concert.deleteMany();
      });

});
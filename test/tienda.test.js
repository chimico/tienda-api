import chai from 'chai';
import chaiHttp from 'chai-http';
import { every } from 'lodash';
import api from '../src/api/main.js'

chai.should();

chai.use(chaiHttp);

describe('Hello', () => {
  // Add your before(), after(), beforeEach() or afterEach() here
});

describe('/GET items', () => {
  it('should list all items', done => {
    chai.request(api)
      .get('/v1/items')
      .end((err, res) => {
        res.should.have.status(200);

        const items = res.body;

        items.should.be.an('array');
        every(items, (item) => {
          item.should.have.property('id');
          item.should.have.property('name');
          item.should.have.property('code');
          item.should.have.property('createdAt');
          item.should.have.property('updatedAt');
        });
        done();
      });
  });

  it('should list one item', done => {
    chai.request(api)
      .get('/v1/items')
      .query({
        limit: 1,
        offset: 0,
      })
      .end((err, res) => {
        res.should.have.status(200);

        const items = res.body;

        items.should.be.an('array').with.length(1);
        done();
      });
  });
});

describe('/POST items', () => {
  it('should add an item', done => {
    chai.request(api)
      .post('/v1/items')
      .send({
        name: 'item',
        code: 123,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object').with.property('id');

        done();
      });
  });
});

describe('/DELETE items', () => {
  it('should add an item', done => {
    chai.request(api)
      .post('/v1/items')
      .send({
        name: 'item',
        code: 123,
      })
      .end((err, res) => {
        const itemId = res.body.id;

        chai.request(api)
          .delete(`/v1/items/${itemId}`)
          .end((err, res) => {
            res.should.have.status(200);

            const item = res.body;

            item.should.be.an('object');
            item.should.have.property('name');
            item.should.have.property('code');
            item.should.have.property('createdAt');
            item.should.have.property('updatedAt');

            done();
          });
      });
  });
});

describe('/PATCH items', () => {
  it('should modify an item', done => {
    chai.request(api)
      .post('/v1/items')
      .send({
        name: 'item',
        code: 123,
      })
      .end((err, res) => {
        const itemId = res.body.id;

        chai.request(api)
          .patch(`/v1/items/${itemId}`)
          .send({
            name: 'modified',
            code: 321,
          })
          .end((err, res) => {
            res.should.have.status(200);

            const item = res.body;

            item.should.be.an('object');
            item.should.have.property('name').eql('modified');
            item.should.have.property('code').eql(321);

            done();
          });
      });
  });
});

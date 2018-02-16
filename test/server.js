//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var server = require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('App', () => {

  beforeEach((done) => { 
    done();
  });

  describe('/GET index', () => {
    it('it should return the index view', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('content-type', 'text/html; charset=UTF-8');

          done();
        });
    })
  });

});

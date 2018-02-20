//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var server = require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var fs = require('fs')

var TEST_FILE = "server.js";

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
          res.should.be.html;

          done();
        });
    })
  });

  describe('/GET api/files', () => {
    it('it should return a 404', (done) => {
      chai.request(server)
        .get('/api/files')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.html;

          done();
        });
    })
  });

  describe('/POST api/files', () => {
    it('it should return a 200 and file size', (done) => {
      testSize = fs.statSync(TEST_FILE).size;

      chai.request(server)
        .post('/api/files')
        .attach('file', fs.readFileSync(TEST_FILE), 'server.js')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('size');
          res.body.size.should.equal(testSize);

          done();
        });
    })
  });



});

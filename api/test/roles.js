process.env.NODE_ENV = 'test';

const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const Role = require('../models/Role');

describe('All test cases:', () => {

    before(done => {
        Role.remove({}, err => done());
    });

    after(done => {
        server.close();
        done();
    })

    it('Should create a new Role', done => {
        let role = new Role({
            name: 'Estagiário'
        });

        chai.request(server)
        .post('/roles')
        .send(role)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Role created');
            res.body.should.have.property('role');
            done();
        })
    });

});
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// import out user collection(database)
import base from './base';

const SIGNUP_URL = '/api/v1/auth/signup';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('POST', () => {
    it('should create a user account', (done) => {
        chai
            .request(app)
            .post(SIGNUP_URL)
            .send(base.signup_user_1)
            .end((err, res) => {
                if (err) done();
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                done();
            });
    });

    it('should raise an error if email or password is missing', (done) => {
        chai.request(app)
            .post(SIGNUP_URL)
            .send(base.signup_user_2)
            .end((err, res) => {
                if (err) done();
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });
    });

});

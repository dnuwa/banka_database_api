import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// import out user collection(database)
import base from './base';

const SIGNUP_URL = '/api/v1/auth/signup';
const LOGIN_URL = '/api/v1/auth/login';

// Configure chai
chai.use(chaiHttp);
chai.should();


describe('CREATE BANK ACCOUNT ', () => {
    it('User should be able to create a bank account', (done) => {
        chai.request(app)
            .post(SIGNUP_URL)
            .send(base.signup_user_3)
            .end((err, res) => {
                console.log(res);
                if (err) done();
                chai.request(app)
                    .post('/api/v1/account')
                    .set('x-access-token', res.body.data.token)
                    .send({ type: 'current' })
                    .end((error, resp) => {
                        if (error) done();
                        resp.should.have.status(201);
                        resp.body.should.be.a('object');
                        resp.body.should.have.property('data');
                        done();
                    });
            });
    });

});

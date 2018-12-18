import chai from 'chai';
import chaitHttp from 'chai-http';
import server from '../../index';

import db from '../../db';

//Configure chai
chai.use(chaitHttp);
chai.should();
let expect = chai.expect;

let login_details = {
        "email":"david0900@gmail.com",
        "password": "davidmwangi"
}

let register_details = {
    "name": "David MWangi",
	"phone_no":"0700888222",
	"email":"david10001@gmail.com",
	"password": "davidmwangi"
}

describe('/POST Register',  () => {
    it.skip('should register user', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(register_details)
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              done();
          });
    });

    it("should login user", function(){
         chai.request(server)
           .post('/api/v1/auth/signin')
           .send(login_details)
           .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('token');
           });
    });
});
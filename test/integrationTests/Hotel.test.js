import chai from 'chai';
import chaitHttp from 'chai-http';
import server from '../../index';


//Configure chai
chai.use(chaitHttp);
chai.should();
let expect = chai.expect;


let login_details = {
    "email":"david101@gmail.com",
    "password": "davidmwangi"
}

let token = null;

beforeEach((done) => {
    chai.request(server)
    .post('/api/v1/auth/signin')
    .send(login_details)
    .end((err, res) => {
       res.should.have.status(200);
       res.body.should.have.property('token');

       token = res.body.token;
       done();
    });
    
});


describe('Hotels', function(){
   describe('GET /users', function(){
    //Test should get all hotels details
    it('should get all hotels', function(done){
         //Generate token  
           chai.request(server)
           .get('/api/v1/users')
           .set('Authorization', token)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.rows.should.be.an('array');
   
               done();
           });

        });
        describe('GET /hotels/<id> ', function(){
            // Test to get details of single hotel
           it("should  get a single hotel details", (done) => {
               const id = 'fea737e3-83ce-4ec2-b408-846f8aa2606d';
               chai.request(server)
                   .get(`/api/v1/hotels/${id}`)
                   .set('Authorization', token)
                   .type('json')
                   .end((err, res) => {
                       console.log(res);
                       res.should.have.status(200);
                       res.body.should.be.an('object');
   
                       done();
                   });
           });  
       });
        
    describe('GET /hotels/<id> ', function(){
         // Test to get a hotel not found
        it("should not get a single hotel details", (done) => {
            const id = 'fea737e3-83ce-4ec2-b408-846f8aa26064';
            chai.request(server)
                .get(`/api/v1/hotels/${id}`)
                .set('Authorization', token)
                .type('json')
                .end((err, res) => {
                    console.log(res);
                    res.should.have.status(404);

                    done();
                });
        });  
    });
            
       
   });
});
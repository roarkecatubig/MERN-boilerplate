// Test file
// Require app
var app = require('./server');
// Require test modules
var request = require('supertest');
var chai = require('chai').expect;
require('colors');

// Describe what route we are testing, used to push to console to highlight route
describe('[LIONS]'.green, function() {

    // GET /lions
    // Describe what should be returning
    // Add 'done' promise to function to end test 
    // Make Request to app using supertest
    // Get specific route
    // Set the header key and value
    // Expect header key and value
    // Expect status code
    // Expect what should be return
    it('should get all lions', function(done) {
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                chai(resp.body).to.be.an('array');
                done();
            })
    });

    // POST /lions
    // Send dummy data for testing
    it('should create a lion', function(done) {
        request(app)
            .post('/lions')
            .send({
                name: 'Mufasa',
                age: 100,
                pride: 'Evil lions',
                gender: 'male'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, resp) {
                chai(resp.body).to.be.an('object');
                done();
            })
    });

    // DELETE /lions:id
    // Send dummy data for deletion
    // On request, get resp.body and retrieve id for deletion
    it('should delete a lion', function(done) {
        request(app)
            .post('/lions')
            .send({
                name: 'test lion',
                age: 100,
                pride: 'test lion',
                gender: 'female'
            })
            .set('Accept', 'application/json')
            .end(function(err, resp) {
                var lion = resp.body;
                request(app)
                    .delete('/lions/' + lion.id)
                    .end(function(err, resp) {
                        chai(resp.body).to.eql(lion);
                        done();
                    });
            })
    });

    // PUT /lions:id
    it('should update a lion', function(done) {
        request(app)
            .post('/lions')
            .send({
                name: 'test lion',
                age: 100,
                pride: 'test lion',
                gender: 'female'
            })
            .set('Accept', 'application/json')
            .end(function(err, resp) {
                var lion = resp.body;
                request(app)
                    .put('/lions/' + lion.id)
                    .send({
                        name: 'new name'
                    })
                    .end(function(err, resp) {
                        chai(resp.body.name).to.equal('new name');
                        done();
                    });
            })
    });
});
/**
 * Created by Vasuki on 11/28/2017.
 */
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var user = require('../models/User');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app');
var mocha = require('mocha');
var UserModel = mongoose.model('User');
chai.use(chaiHttp);
        describe('/GET user', () => {
            it('it should GET all the users', (done) => {
                chai.request(server)
                    .get('/user')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });

        UserModel.findOne({email:'test'}).remove().exec();

        describe('/POST Login user', () => {
            it('If the user does not exists it should throw error', (done) => {
                let userLogin = {"user":{"email":"test", "password":"test"}}
                console.log("before Chai");
                chai.request(server)
                    .post('/users/login')
                    .send(userLogin)
                    .end((err,res) => {
                        res.should.have.status(422);
                        res.body.should.have.property('errors');
                        done();
                    });
            });
        });

        describe('/POST user', () => {
            it('it Should create user and return success', (done) => {
                let userRegister = {"user":{"email":"test", "password":"test","username":"test","org":true}}
                chai.request(server)
                    .post('/users')
                    .set('Content-Type','application/json')
                    .set('X-Requested-With','XMLHttpRequest')
                    .send(userRegister)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        describe('/POST user', () => {
            it('it Should return error if the user exists', (done) => {
                let user = {"user":{"email":"test", "password":"test","username":"test","org":true}}
                chai.request(server)
                    .post('/users')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(422);
                        res.body.should.have.property('errors');
                        done();
                    });
            });
        });

        describe('/POST Login user', () => {
            it('If the user exists it should login', (done) => {
                let userLogin = {"user":{"email":"ngo3@email", "password":"ngo2email"}}
                console.log("before Chai");
                chai.request(server)
                    .post('/users/login')
                    .send(userLogin)
                    .end((err,res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

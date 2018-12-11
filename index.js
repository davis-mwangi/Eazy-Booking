import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import bodyParser from 'body-parser';
import multer from 'multer';

import Hotel from './src/controllers/Hotels';
import Auth from './src/middleware/Auth';
import User from './src/controllers/User';

import upload from './src/controllers/UploadFile';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false})); //handle body requests

app.get('/', (re1, res) => {
    return res.status(200).send({'message': 'Welcome to Eazy booking API'});
});
app.post('/api/v1/hotels',Auth.verifyToken, Hotel.create);
app.get('/api/v1/hotels',Auth.verifyToken, Hotel.getAll);
app.get('/api/v1/hotels/:id',Auth.verifyToken, Hotel.getOne);
app.put('/api/v1/hotels/:id',Auth.verifyToken, Hotel.update);
app.delete('/api/v1/hotels/:id',Auth.verifyToken, Hotel.delete);

app.post('/api/v1/auth/signup', User.create);
app.post('/api/v1/auth/signin', User.login);
app.delete('/api/v1/auth/del_user', User.delete);
app.get('/api/v1/users',Auth.verifyToken, User.getAll);
app.get('/api/v1/users/:id',Auth.verifyToken, User.getDetails);
app.put('/api/v1/users/:id',Auth.verifyToken, User.updateUser);

app.post('/api/v1/upload',multer(upload).single('photo'),function(req,res){
    res.send('Complete!');
 });

let server = app.listen(3000, () => {
    let host =  server.address().address;
    let port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
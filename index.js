import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';

import Hotel from './src/controllers/Hotels';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (re1, res) => {
    return res.status(200).send({'message': 'Welcome to Eazy booking API'});
});
app.post('/api/v1/hotels', Hotel.create);
app.get('/api/v1/hotels', Hotel.getll);
app.get('/api/v1/hotels/:id', Hotel.getOne);
app.put('/api/v1/hotels/:id', Hotel.update);
app.delete('/api/v1/hotels/:id', Hotel.delete);

let server = app.listen(3000, () => {
    let host =  server.address().address;
    let port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
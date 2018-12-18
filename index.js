import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import bodyParser from 'body-parser';


import routes from './src/routes/index';

dotenv.config();

const app = express();
const router =  express.Router();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true})); //handle body requests

app.use(bodyParser.text());

var port = process.env.PORT || 3000;

app.get('/', (re1, res) => {
    return res.status(200).send({'message': 'Welcome to Eazy booking API'});
});

app.use('/api/v1', routes(router));




let server = app.listen(port, () => {
    let host =  server.address().address;
    //let port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});

export default app;
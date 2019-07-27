import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.json';
import path from 'path';

// support async/await
import babel from 'babel-core/register';
import polyfill from 'babel-polyfill';

const api_public = require('./routes/api-public.route');
const client = require('./routes/client.route');

let app = express();
app.use('/static', express.static(path.join(__dirname, './public')));

app.server = http.createServer(app);

app.use(morgan('dev')); // logger
app.use(cors({exposedHeaders: config.corsHeaders}));
app.use(bodyParser.json({limit: config.bodyLimit}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/public/', api_public);
app.use('/', client);

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});


export default app;

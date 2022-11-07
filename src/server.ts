import 'reflect-metadata';
import './typeorm/createConnection';
import 'express-async-errors';

import express from 'express';
import routes from 'routes';
import cors from 'cors';
import GlobalErrorHandler from 'errors/GlobalErrorHandler';

const app = express();

app.use(express.json());
app.use(
    cors(
        process.env.FRONTED_URL
            ? {
                  origin: process.env.FRONTED_URL,
              }
            : {},
    ),
);
app.use(routes);
app.use(GlobalErrorHandler);
app.listen('3333');

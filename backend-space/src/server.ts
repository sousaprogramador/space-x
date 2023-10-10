import api from './api';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import { seed } from './services/seeds';
import { jobs } from './services/schedules';
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const { ip, port, env, mongo } = config;

const app = express();

app.use(cors());
app.use(express.json());
app.use(api);

if (mongo.uri) mongoose.connect(mongo.uri);

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Fullstack Challenge 🏅 - Space X API' });
});

const options = {
    swaggerDefinition: {
        info: {
            title: 'Documentação da API OpenAI',
            version: '1.0.0',
            description: 'Documentação da API OpenAI para seu serviço',
        },
    },
    apis: [`${__dirname}/api/**/*.ts`],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', api);
app.listen(port, () => {
    console.log(
        `[${new Date().toISOString()}] Express server listening on http://%s:%d, in %s mode`,
        ip,
        port,
        env
    );
    jobs();
    seed();
});

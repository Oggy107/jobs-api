require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connect = require('./db/connect');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const authenticateMiddelware = require('./middlewares/authenticate');

const MONGO_URI = process.env.MONGO_URI;
const PORT = 3000;

const main = async () => {
    try {
        await connect(MONGO_URI);
        console.log('[SERVER]: Connected to database.');

        app.use(express.json());

        app.use('/api/v1/auth', authRouter);
        app.use('/api/v1/jobs', authenticateMiddelware, jobsRouter);
        
        app.use([notFoundMiddleware, errorHandlerMiddleware]);

        app.listen(PORT, () => {
            console.log('[SERVER]: Server is up at http://localhost:' + PORT);
        })
    } catch (error) {
        console.error('[ERROR]: ', error);
        process.exitCode = 1;
    }
}

if (require.main === module)
    main();
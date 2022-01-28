require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connect = require('./db/connect');

// documentaion
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yamljs').load('./docs/docs.yaml');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// middlewares
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const authenticateMiddelware = require('./middlewares/authenticate');

const MONGO_URI = process.env.MONGO_URI;
const PORT = 3000;

const main = async () => {
    try {
        await connect(MONGO_URI);
        console.log('[SERVER]: Connected to database.');

        const rateLimiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false
        })

        app.set('trust proxy', 1);
        app.use(rateLimiter)
        app.use(helmet());
        app.use(cors());
        app.use(xss());
        app.use(express.json());

        app.use('/api/v1/auth', authRouter);
        app.use('/api/v1/jobs', authenticateMiddelware, jobsRouter);
        app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        
        app.use([notFoundMiddleware, errorHandlerMiddleware]);

        app.listen(process.env.PORT || PORT, () => {
            console.log('[SERVER]: Server is up at port ' + PORT);
        })
    } catch (error) {
        console.error('[ERROR]: ', error);
        process.exitCode = 1;
    }
}

if (require.main === module)
    main();
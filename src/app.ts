import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// DB connect
import sequelize from './db/sequelize';

// Models
import User from './models/User';

// Routes
// import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const port = process.env.PORT || 3000;

// Routes
// app.use("/api/v1/auth", authRoutes);

const start = async (): Promise<void> => {
    try {
        // await sequelize.sync();
        app.listen(port, () => console.log(`Server is listening on port: ${port}`));
    } catch (error) {
        console.error(error);
    }
};

start();

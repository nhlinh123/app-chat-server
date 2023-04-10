import userRoute from "./routes/user.route";

require('dotenv').config();
import cookieParser from "cookie-parser";
import express, {NextFunction} from 'express';
import config from 'config';
import healthcheck from 'express-healthcheck';
import connectDB from "./utils/connectDB";
import morgan from "morgan";
import cors from 'cors';
import authRoute from "./routes/auth.route";

// init app using express
const app = express();

// Middleware
// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3.Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4.Cors
app.use(
    cors({
        origin: config.get<string>('origin'),
        credentials: true,
    })
)

// 5. Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute);


// use health check
app.use('/healthcheck', healthcheck({
    healthy: () => {
        return { everything: 'is ok'}
    },
    test: () => {
        throw new Error('Application is not running');
    }
}));

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});


const port = config.get<number>('port');
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    connectDB();
})

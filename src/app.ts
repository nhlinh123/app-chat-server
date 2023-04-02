require('dotenv').config();
import express from 'express';
import config from 'config';
import healthcheck from 'express-healthcheck';


const app = express();
app.use('/healthcheck', healthcheck({
    healthy: () => {
        return { everything: 'is ok'}
    },
    test: () => {
        throw new Error('Application is not running');
    }
}));

const port = config.get<number>('port');
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

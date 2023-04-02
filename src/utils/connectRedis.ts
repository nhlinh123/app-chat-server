import { createClient } from 'redis';

const redisUrl = `redis://localhost:6379`;
const redisClient = createClient({
   url: redisUrl
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected')
    } catch (e: any) {
        console.log(e.message);
        console.log('Try to connect to redis after 5s');
        setTimeout(connectRedis, 5000);
    }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;

import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb://${config.get('dbName')}:${config.get('dbPass')}@localhost:6000/app-chat-server?authSource=admin`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
    } catch (e: any) {
        console.log(e.message);
        console.log('Try to connect DB after 5s');
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;

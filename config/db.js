import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'TemchoAPI'
        });
        console.log(`MongoDB connected: ${conn.connection.host}`.green.underline);
    } catch (error) {
        console.error('MongoDB connection error!', error);
        process.exit(1);
    }
}

export default connectDB;
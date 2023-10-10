import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod = new MongoMemoryServer()

export const connect = async () => {
    await mongod.start();

    const uri = mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
    } as ConnectOptions;

    await mongoose.connect(uri, mongooseOpts);
}

export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
} 
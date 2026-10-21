import { Collection, Db, MongoClient } from "mongodb"

const uri = process.env.MONGO_DEV_URI || 'fsfafa'
if(!uri) {
    throw new Error('Database connection not found, make sure you`r connected with your database')
}
let client: MongoClient
let db: Db

export const connectToDatabase = async () => {
    if(!client) {
        client = new MongoClient(uri)
        await client.connect()
        db = client.db('restro-web')
    }
    return { client, db }
}
// user table
export const getUserCollection = async (): Promise<Collection> => {
    if(!db) {
        const { db: database } = await connectToDatabase()
        return database.collection('users')
    }
    return db.collection('users')
}
// tasks table
export const getTaskCollection = async (): Promise<Collection> => {
    if(!db) {
        const { db: database } = await connectToDatabase()
        return database.collection('tasks')
    }
    return db.collection('tasks')
}
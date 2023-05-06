import mongoose from "mongoose";


async function connectDatabase() {
    const dbURI = process.env.DB_URI
    try {
        await mongoose.connect(dbURI)
        console.log('connected to DB')
    } catch (error) {
        console.log(`Could not connect to DB due to: ${error}`)
        process.exit(1);
    }
}


export default connectDatabase
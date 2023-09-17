import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const DB_URL = process.env.DB_URL
// console.log(DB_URL)

const Connection = async () => {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true})
        console.log("connected to database")
        
    } catch (error) {
        console.log("error connecting to database", error)
    }
}

export default Connection
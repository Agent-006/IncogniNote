import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        console.log("Already to connected to database");
        return 
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {
            // You can also pass some options if required
        })
        console.log(db);
        console.log(db.connections);
        connection.isConnected = db.connections[0].readyState // readyState is a number by default
        console.log("DB connected successfully");
    } catch (error:any) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

export default dbConnect;
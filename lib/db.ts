import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (mongoose?.connection.readyState >= 1) return
        await mongoose.connect(process.env.DB_URL!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
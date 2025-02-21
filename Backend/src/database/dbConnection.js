import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(`${process.env.MONGO_URI}/MERN_BOOKING_APP`)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(`Some error occured while connecting to database: ${err}`);
    })
}
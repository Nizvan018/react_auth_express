import mongoose from "mongoose";

const db_url = process.env.DATABASE_URL;

export const conect_db = async () => {
    try {
        await mongoose.connect(db_url);
        console.log('Conexión exitosa');
    } catch (error) {
        console.log(error);
    }
}
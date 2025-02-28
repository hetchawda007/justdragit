import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userschema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

export default mongoose.models.User || mongoose.model('User', userschema);
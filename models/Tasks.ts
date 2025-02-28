import mongoose from "mongoose";
const Schema = mongoose.Schema;
const taskschema = new Schema({
    email: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    }
});

export default mongoose.models.Tasks || mongoose.model('Tasks', taskschema);
import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    text: { type: String }
});

export default mongoose.model("Todo", TodoSchema);
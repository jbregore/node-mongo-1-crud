import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: String,
    breed: String,
    owner: String,
    description: String,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Pets = mongoose.model("Pets", petSchema);

export default Pets;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    email: String,
    password : String
});

let User = mongoose.model("users", userSchema);

export default User;
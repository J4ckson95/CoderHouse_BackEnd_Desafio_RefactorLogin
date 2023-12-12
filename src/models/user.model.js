import mongoose from "mongoose";
const collection = "users"
const userSchema = mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    rol: { type: String, default: "user", enum: ["user", "admin"] }
})
const userModel = mongoose.model(collection, userSchema)
export default userModel
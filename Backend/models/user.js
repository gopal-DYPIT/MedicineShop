const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiration: { type: Date },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Default role is 'user'
});

module.exports = mongoose.model("User", userSchema);

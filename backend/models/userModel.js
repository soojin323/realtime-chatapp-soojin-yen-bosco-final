const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true ,
    },
    authentication: {
        salt: { type: String },
        password: { type: String, required: function() { return !this.isGoogleAccount; } },
        sessionToken: { type: String },
        newPassword: { type: String },
    },
    resetPassword: {
        resetToken: { type: String },
        resetExpiration: { type: Date },
    },
    profileURL: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        Enum: ["active", "away"],
        default: "away",
    },
    showProfile: {
        type: Boolean,
        default: false,
    },
    showStatus: {
        type: Boolean,
        default: false,
    },
    showAbout: {
        type: Boolean,
        default: false,
    },
    friends: [{ type: String }],

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    firebaseUid: { 
        type: String,
         default: null },
         isGoogleAccount: { 
            type: Boolean, 
            default: false 
          },
          profilePicture: { 
            type: String,
            default: '' // Default value if no profile picture is provided
        },
});

const userModel = mongoose.model("users", usersSchema);

module.exports = userModel;

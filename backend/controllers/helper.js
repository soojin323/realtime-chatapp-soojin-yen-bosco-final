const userModel = require("../models/userModel.js");
const crypto = require("crypto");
const secret = process.env.SECRET;

const createUser = (values) =>
    new userModel(values).save().then((user) => user.toObject());
const getUserByEmail = (email) => userModel.findOne(email);
const getUserBySessionToken = (sessionToken) => {
    userModel.findOne({ "authentication.sessionToken": sessionToken });
};
const getUserByResetToken = (resetToken, currentTime) =>
    userModel.findOne({
        "resetPassword.resetToken": resetToken,
        "resetPassword.resetExpiration": { $gte: currentTime },
    });

const random = () => crypto.randomBytes(128).toString("base64");

const authentication = (salt, password) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(secret)
        .digest("hex");
};

console.log("Secret:", secret);

module.exports = {
    createUser,
    getUserByEmail,
    random,
    authentication,
    getUserBySessionToken,
    getUserByResetToken,
};

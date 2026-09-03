//for token blacklisting we usually use db's like redis because they have high throughput 
const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"],
    }
},{timestamps:true})

const tokenBlacklistModel = mongoose.model("BlacklistToken", blacklistTokenSchema);

module.exports = tokenBlacklistModel;

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    departmentNo: {type: Number}
})

var UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DepartmentSchema = new Schema({
    departmentName: { type: String },
    departmentNo: {type: Number}
})

var DepartmentModel = mongoose.model('Department', DepartmentSchema)

module.exports = DepartmentModel
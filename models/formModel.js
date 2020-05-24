var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FormSchema = new Schema({
    isActedOn: {type: Boolean},
    isApproved: {type: Boolean},
    createdBy: {type: String},
    createdByName: {type: String},
    createdByDepartment: {type: String},
    createdTo: {type: String},
    departmentNo: {type: Number},
    message: {type: String}
})

var FormModel = mongoose.model('Form', FormSchema)

module.exports = FormModel
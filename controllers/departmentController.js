var departmentModel = require('../models/departmentModel')

module.exports.createDepartment = async function (req, res) {
    let department = await departmentModel.findOne({ departmentNo: req.body.departmentNo })
    if(department == null){
        departmentModel.create({
            departmentName: req.body.departmentName,
            departmentNo: req.body.departmentNo
        }, function(err, result){
            if(err){
                console.log(err)
            }
            else{
                res.status(201).send(result)
            }
        })
    }
    else{
        res.status(409).send("Department already exists")
    }
}

module.exports.getDepartment = async function (req, res) {
    let departments = await departmentModel.find()
    res.status(200).send(departments)    
}
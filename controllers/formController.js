var formModel = require('../models/formModel')


module.exports.createForm = function (req, res) {
    formModel.create({
        isActedOn: false,
        isApproved: false,
        createdBy: req.body.createdBy,
        createdByName: req.body.createdByName,
        createdByDepartment: req.body.createdByDepartment,
        createdTo: req.body.createdTo,
        departmentNo: req.body.departmentNo,
        message: req.body.message
    }, function (err, result) {
        if(err){
            console.log(err)
        }
        else{
            res.status(200).send(result)
        }

    })
}

module.exports.editForm = async function (req, res) {
    let form = await formModel.findOne({_id: req.body.id})
    if(form.createdTo === req.body.email){
        data = {
            isApproved : req.body.isApproved,
            isActedOn : true
        }
        formModel.updateOne({_id: form._id}, {$set: data}, function (err, result){
            if(err){
                console.log(err)
            }
            else{
                res.status(200).send(result)
            }
        })
    }   
    else{
        res.status(404).send('Not authorized')
    }
}

module.exports.deleteForm = async function (req, res){
    let form = await formModel.findOne({_id: req.body.id})
    if(form.createdBy === req.body.email){
        formModel.deleteOne({_id: form._id}, function (err, result) {
            if(err){
                console.log(err)
            }
            else{
                res.status(200).send(result)
            }
        })
    }
    else{
        res.status(404).send('Not authorized')
    }
}

module.exports.getForm = async function (req, res){
    let forms = await formModel.find({'departmentNo': Number(req.body.departmentNo)})
    res.status(200).send(forms) 
}

module.exports.getSentForm = async function (req, res){
    let forms = await formModel.find({'createdBy': req.body.email})
    res.status(200).send(forms)

}

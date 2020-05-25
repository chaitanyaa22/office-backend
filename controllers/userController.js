var bcrypt = require('bcrypt')
var userModel = require('../models/userModel')
var departmentModel = require('../models/departmentModel')
var formModel = require('../models/formModel')



module.exports.signUp = async function (req, res) {
    let user = await userModel.findOne({ email: req.body.email })
    if (user == null) {
        let hashPassword = await bcrypt.hashSync(req.body.password, 10);
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
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
    else {
        res.status(409) //Already Exists
    }
}

module.exports.logIn = async function(req, res){
     let user = await userModel.findOne({email: req.body.email})
     if (user != null){
        let pass = await bcrypt.compareSync(req.body.password, user.password);
        if(pass){
            let others = await userModel.find({'departmentNo' : { $ne: user.departmentNo}})
            req.session.user = {
                id: user._id
            }
            res.status(200).send({user: user, others: others})
        }
        else{
            res.status(401).send('Incorrect Password') //Incorrect Password
        }
     }
     else{
         res.status(404).send('User not found') //User not found
     }
    
}
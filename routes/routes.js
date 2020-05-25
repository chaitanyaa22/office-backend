module.exports = function (io) {
    var express = require('express')
    var router = express.Router()
    var userController = require('../controllers/userController')
    var departmentController = require('../controllers/departmentController')
    var formController = require('../controllers/formController')

    router.post('/signup', userController.signUp)
    router.post('/login', userController.logIn)

    router.get('/department', departmentController.getDepartment)
    router.post('/department', departmentController.createDepartment)

    // router.use(function (req, res, next) {
    //     if (req.session.user) {
    //         next();
    //     }
    //     else {
    //         res.status(404).send('Login First')
    //     }
    // })

    router.post('/getform', formController.getForm)
    router.post('/form', formController.createForm(io))
    router.post('/sentform', formController.getSentForm)
    router.put('/editform', formController.editForm(io))
    router.delete('/deleteform', formController.deleteForm)

    return router
}

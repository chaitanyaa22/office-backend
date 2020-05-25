var express = require('express')
var mongoose = require('mongoose')
var session = require('express-session')
var bodyParser = require("body-parser")
var cors = require('cors')
var http = require('http')


var app = express()
var server = http.createServer(app)
var socketIO = require('socket.io')(server)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60,
        path: '/',
        httpOnly: true
        
    }
}))


var url = 'mongodb+srv://cck2222:Cck@1832@cluster0-iicnl.mongodb.net/office?retryWrites=true&w=majority'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});


app.use("/", require('./routes/routes')(socketIO))

server.listen(process.env.PORT || 3500)
// module.exports = socketIO

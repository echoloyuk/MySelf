var express = require('express');
var router = express.Router();
var user = require('../module/user')

/* GET editor. */
router.get('/editor', function(req, res, next) {
    res.render('editor', { title: 'Express' });
});

/* GET login */
router.get('/login', function (req, res, next){
    res.render('login');
});

/* login req */
router.post('/doLogin', function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + ':' + password);

    user.loginAuth(username, password, function (rows){
        var session = req.session;
        session['username'] = rows[0]['username'];
        var info = {
            stat: 'success'
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(info));
    }, function (){
        var session = req.session;
        delete session['username'];
        var info = {
            stat: 'error'
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(info));
    });
});

/* GET welcome */
router.use('/welcome', function (req, res, next){
    res.render('welcome');
});

/* GET dashboard */
router.use('/', function (req, res, next){
    res.render('dashboard');
});



module.exports = router;
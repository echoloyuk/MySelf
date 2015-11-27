var express = require('express');
var router = express.Router();
var user = require('../module/user')

/* GET editor. */
router.get('/editor', function(req, res, next) {
    res.render('editor', { title: 'Express' });
});

/* GET dashboard */
router.get('/', function (req, res, next){
    res.render('dashboard');
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
        res.send('success');

    }, function (){

        var session = req.session;
        delete session['username'];
        res.send('error');
    });
});


module.exports = router;
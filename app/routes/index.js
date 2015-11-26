var express = require('express');
var router = express.Router();

var data = require('../components/data');

/* GET home page. */
router.get('/', function(req, res, next) {
    var c = data.query('select * from myself_user', function (rows){
        console.log(2233);
        console.log(rows);
        res.render('index', { title: 'Express' });
    });
});

router.get('/test', function (req, res, next){
    res.render('test', {});
});

module.exports = router;

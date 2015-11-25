var express = require('express');
var router = express.Router();

var data = require('../components/data');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    var c = data.testConn();
    console.log(c);
});

router.get('/test', function (req, res, next){
    res.render('test', {});
});

module.exports = router;

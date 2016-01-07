var express = require('express');
var CONFIG = require('../config');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var render = {
        title: CONFIG.blog.title,
        subtitle: CONFIG.blog.subtitle
    };
    res.render('index', render);
});

router.get('/test', function (req, res, next){
    res.render('test', {});
});

module.exports = router;

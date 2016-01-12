var express = require('express');
var CONFIG = require('../config');
var article = require('../module/article');

var router = express.Router();

/* GET home page. */
/*
    article:[{id:'', title:'', content:'', date:'', user:''}]
 */
router.get('/', function(req, res, next){
    res.render('index', CONFIG.blog);
});

/* ajax get article */
router.get('/getArticleList', function (req, res, next){

    var p = parseInt(req.query.page);
    if (typeof p !== 'number' || p <= 0){
        p = 0;
    }
    console.log('page:' + p);

    article.getArticleList(0, 10, function (rows){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
    }, function (err){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(err));
    });
});

router.get('/test', function (req, res, next){
    res.render('test', {});
});

module.exports = router;

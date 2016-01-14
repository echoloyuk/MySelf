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
    var count = CONFIG.blog.homeArticleCount;
    if (typeof p !== 'number' || p <= 1){
        p = 1;
    }
    var curPage = p;
    p = (p - 1) * count;

    article.getArticleList(p, count, function (rows, total){
        var totalPage = Math.floor(total / count) + 1;
        var data = {
            article: rows,
            totalPage: totalPage,
            curPage: curPage
        };
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    }, function (err){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(err));
    });
});

/* open the article */
router.get('/article', function (req, res, next){
    res.render('article', CONFIG.blog);
});

router.get('/test', function (req, res, next){
    res.render('test', {});
});

module.exports = router;

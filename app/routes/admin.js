var express = require('express');
var router = express.Router();
var user = require('../module/user');
var article = require('../module/article');
var image = require('../module/image');
var util = require('../components/util');
var multiparty = require('multiparty');
var fs = require('fs-extra');
var async = require('async');
var CONFIG = require('../config');

/* GET editor. */
router.get('/editor', function(req, res, next) {
    var articleId = req.query.articleId;
    if (!articleId){
        res.render('editor', { title: 'Express' });

    } else { //modify
        
        article.getArticle(articleId, function (rows){
            var data = {
                title:rows[0]['title'],
                content:rows[0]['content']
            };
            res.render('editor', data);
        }, function (){

            //没有找到articleid，默认显示新增
            res.render('editor', {title: 'Express'});
        });
    }
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

    user.loginAuth(username, password, function (result){
        var session = req.session;
        session['username'] = result['username'];
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

/* submit article */
router.post('/doPostArticle', function (req, res, next){
    var session = req.session;
    var username = session.username,
        title = req.body.title,
        content = req.body.article;

    var flag = false;
    if (!title){
        flag = true;
    }
    if (!content){
        flag = true;
    }
    if (flag){
        var err = {
            stat: 'error',
            info: '标题和正文不能为空'
        };
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(err));
        return;
    }
    var data = {
        title: title,
        article: content,
        user: username
    };
    async.waterfall([
        function (next){
            article.setArticle(data, function (result, articleId){
                next(null, articleId);
            }, function (err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err));
            });
        }, function (articleId, next){
            next(null);
            /*var tmpId = session['articleTmpId'];
            image.saveImage(tmpId, articleId, function (res){
                next(null);
            }, function (err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err));
            });*/
        }, function (next){
            //session['articleTmpId'] = '';
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({stat:'success', info:'文章发布成功'}));
        }
    ]);
});

/* submit image to sys */
router.post('/doPostImage', function (req, res, next){
    console.log('image uploading');
    var imgForm = new multiparty.Form();
    var session = req.session;
    imgForm.parse(req, function (err, fields, files){
        if (err){
            result = {
                stat: 'error',
                info: '图片上传错误'
            };
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
            return;
        }

        image.setImage(files['hImgUpLoadInput'], session['articleTmpId'], function (path){
            res.send(path);
        }, function (res){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(res));
        });
    });
});

/* get article list to administrator */
router.get('/article', function (req, res, next){
    res.render('admin-article');
});

/* article list from admin dashboard */
router.get('/getArticle', function (req, res, next){
    var page = parseInt(req.query.page);
    var itemNum = CONFIG.admin.itemsCount;
    if (typeof page !== 'number' || page < 1){
        page = 1;
    }
    var data = {
        curPage: page,
        totalPage: null,
        data: null,
        totalItems: null
    }
    article.getAllArticle(page - 1, itemNum, function (rows, total){
        data.data = rows,
        data.totalPage = Math.floor((total - 1) / itemNum) + 1;
        data.totalItems = total;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    }, function (err){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(err));
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
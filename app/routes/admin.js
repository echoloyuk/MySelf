var express = require('express');
var router = express.Router();
var user = require('../module/user');
var article = require('../module/article');
var image = require('../module/image');
var util = require('../components/util');
var multiparty = require('multiparty');
var fs = require('fs-extra');
var async = require('async');

/* GET editor. */
router.get('/editor', function(req, res, next) {
    
    //为了保证在写文章时能顺利保存图片，因此需要session中保存临时的一个id，用来记录图片的对应关系
    var session = req.session;
    if (!session['articleTmpId']){
        session['articleTmpId'] = util.getUID('myself');
    }

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
            var tmpId = session['articleTmpId'];
            image.saveImage(tmpId, articleId, function (res){
                next(null);
            }, function (err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err));
            });
        }, function (next){
            session['articleTmpId'] = '';
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

/* GET welcome */
router.use('/welcome', function (req, res, next){
    res.render('welcome');
});

/* GET dashboard */
router.use('/', function (req, res, next){
    res.render('dashboard');
});



module.exports = router;
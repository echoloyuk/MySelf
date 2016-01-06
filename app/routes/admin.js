var express = require('express');
var router = express.Router();
var user = require('../module/user');
var article = require('../module/article');
var util = require('../components/util');
var multiparty = require('multiparty');
var fs = require('fs-extra');

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
    article.setArticle(data, function (result){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    }, function (err){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(err));
    });
});

/* submit image to sys */
router.post('/doPostImage', function (req, res, next){
    console.log('image uploading');
    var imgForm = new multiparty.Form();
    var result = {};
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
        var tmpPath = files['hImgUpLoadInput'][0]['path'].replace('//', '/'),
            fileName = files['hImgUpLoadInput'][0]['originalFilename'],
            filePath = './public/static/uploads/' + fileName;

        fs.move(tmpPath, './public/static/uploads/' + fileName, function (err){
            if (err){
                result = {
                    stat: 'error',
                    info: '图片移动错误'
                };
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
                return;
            }
            res.send('/static/uploads/' + fileName);
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
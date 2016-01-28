/*
 * 处理文章相关
 */
var async = require('async');
var connection = require('../components/connection');
var user = require('../module/user');
var util = require('../components/util');

var article = {};

/*
 * artice = {title:'', article:'', user:''}
 */
article.setArticle = function (article, onSucc, onErr){
    var conn = connection.connect();
    if (!article){
        onErr.call(this);
    }
    var _user = article.user,
        title = article.title,
        article = util.sqlFilter(article.article),
        category = 1,
        date = util.getDateString(new Date),
        update = date,
        userId;
    var result = {};
    async.waterfall([
        function (next){
            user.getUserId(_user, function (id){
                if (id){
                    userId = id;
                    next(null);
                }
            }, function (){
                result.stat = 'error';
                result.info = 'userid为空';
                onErr.call(this, result);
                return;
            });
        }, function (next){
            var sql = 'insert into myself_article ' +
                        '(title, content, category_id, create_date, update_date, user_id, count) ' +
                        'values ("' +
                        title + '", "' +
                        article + '", ' +
                        category + ', "' +
                        date + '", "' +
                        update + '", ' +
                        userId + ', ' +
                        '0)';
            conn.query(sql, function (err, res){
                if (err){
                    console.log(err);
                    result.stat = 'error';
                    result.info = '文章插入数据库错误';
                    onErr.call(this, result);
                    return;
                }
                result.stat = 'success';
                result.info = '文章插入成功'

                onSucc.call(this, result, res.insertId);
            });
        }
    ]);
};

/*
 * 获取article list, 从start开始取，取count
 * return [{id:'', title:'', content:'', date:'', user:''}]
 */
article.getArticleList = function (start, count, onSucc, onErr){
    var conn = connection.connect();
    var sql = 'SELECT ' +
              'a.id id, ' +
              'a.title title, ' +
              'a.content content, ' +
              'a.update_date date, ' +
              'u.username user ' +
              'FROM ' +
              'myself_article a, myself_user u ' +
              'WHERE a.user_id=u.id ' +
              'ORDER BY a.id DESC ' +
              'LIMIT ' + start + ',' + count;
    async.waterfall([
        function (next){
            conn.query(sql, function (err, rows, fields){
                if (err){
                    onErr.call(this, {stat:'error', info:'查询文章数据库错误'});
                    return;
                }
                next(null, rows);
            });
        }, function (rows, next){ //deal with image url
            var cur;
            var reg = /!\[\S+\]\((\S+)\)/; //查找文章中的图片路径
            var regRes;
            var imgUrl;
            for (var i = 0, count = rows.length; i < count; i++){
                cur = rows[i]['content'];
                regRes = reg.exec(cur);
                if (regRes && regRes[1]){
                    rows[i]['imgUrl'] = regRes[1];
                }
            }
            console.log(rows);
            next(null, rows);
        }, function (rows, next){
            var sql = 'SELECT a.id FROM myself_article a';
            conn.query(sql, function (err, total, fields){
                if (err){
                    console.log(err);
                    onErr.call(this, {stat:'error', info:'查询文章总数错误'});
                    return;
                }
                next(null, rows, total.length);
            });
        }, function (rows, total, next){
            onSucc.call(this, rows, total);
        }
    ]);
};

/* 获得article */
article.getArticle = function (articleId, onSucc, onErr){
    var conn = connection.connect();
    if (!articleId){
        onErr.call(this, {stat:'error', info:'文章id为空'});
        return;
    }
    var sql = 'SELECT ' +
              'a.id id, a.title title, a.content content, a.category_id category, a.create_date createDate, a.update_date updateDate, u.username author, a.count count ' +
              'FROM myself_article a, myself_user u ' +
              'WHERE a.user_id=u.id ' +
              'AND a.id=' + articleId;
    async.waterfall([
        function (next){
            conn.query(sql, function (err, rows){
                if (err){
                    console.log(err);
                    onErr.call(this, {stat:'error', info:'未找到相应的文章'});
                    return;
                }
                if (!rows || rows.length < 1){
                    onErr.call(this, {stat:'error', info:'未找到相应的文章'});
                    return;
                }
                onSucc.call(this, rows);
            });
        }
    ])
}


module.exports = article;
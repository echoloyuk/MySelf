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
              'a.id id, a.title title, a.content content, a.update_date date, u.username user, i.url imgUrl ' +
              'FROM myself_article a ' +
              'LEFT JOIN myself_user u ON (u.id=a.user_id) ' +
              'LEFT JOIN myself_img i ON (i.refer_to_article_id=a.id)' +
              'GROUP BY a.id ' +
              'ORDER BY a.id desc ' +
              'LIMIT ' + start + ',' + count;
    console.log(sql);
    async.waterfall([
        function (next){
            conn.query(sql, function (err, rows, fields){
                if (err){
                    console.log(err);
                    onErr.call(this, {stat:'error', info:'查询文章数据库错误'});
                    return;
                }
                next(null, rows);
            });
        }, function (rows, next){
            onSucc.call(this, rows);
        }
    ]);
}


module.exports = article;
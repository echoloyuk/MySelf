/*
 * 处理图片相关
 */
var fs = require('fs-extra');
var CONFIG = require('../config');
var async = require('async');
var util = require('../components/util');
var connection = require('../components/connection');

var image = {}

/*
 * para: image files
 */
image.setImage = function (files, articleTmpId, onSucc, onErr){
    var tmpPath = files[0]['path'].replace('//', '/'),
        imgName = files[0]['originalFilename'],
        imgSize = files[0]['size'];
    var newImgName = util.getImageName(imgName),
        newImgPath = CONFIG.upload.uploadDir + newImgName;

    async.waterfall([
        function (next){ //移动图片
            fs.move(tmpPath, newImgPath, function (err){
                if (err){
                    var result = {stat:'error', info:'图片移动错误'};
                    onErr.call(this, result);
                    return;
                }
                next(null);
            });
        }, function (next){
            var conn = connection.connect();
            var imgUrl = CONFIG['upload']['uploadUrl'] + newImgName;
            var sql = 'insert into myself_img (url, refer_to_article_id, size, create_date) values ' +
                    '("' + imgUrl + '", ' +
                    '"' + articleTmpId + '", ' +
                    '"' + imgSize + '", ' +
                    '"' + util.getDateString(new Date) + '")';
            console.log(sql);
            conn.query(sql, function (err){
                if (err){
                    onErr.call(this, {stat:'error', info:'数据库插入错误'});
                    return;
                }
                onSucc.call(this, imgUrl);
            });
        }
    ]);
};

image.saveImage = function (articleTmpId, articleId, onSucc, onErr){
    var conn = connection.connect();
    var sql = 'update myself_img set refer_to_article_id="' + articleId + '" where refer_to_article_id="' + articleTmpId + '"';
    conn.query(sql, function (err){
        if (err){
            onErr.call(this, {stat:'error', info:'图片与文章链接失败'});
            return;
        }
        onSucc.call(this, {stat:'success'});
    });
};

module.exports = image;
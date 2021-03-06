/*
 * 登录统一验证。
 * 只有在访问admin下的所有内容时，才会需要判定登录，
 * @author echoloyuk
 */
var express = require('express');
var router = express.Router();

router.use(function (req, res, next){
    var session  = req.session;
    console.log('auth validate');

    if (req.method === 'GET'){ //只对GET做筛选
        if (req.originalUrl === '/admin/login'){ //访问登录本身则放过
            next();
        } else {
            if (session && session['username']){ //通过
                next();
            } else { //需要登录
                res.redirect('/admin/login');
            }
        }
    } else {
        next();
    }
});

/*
router.use(function (req, res, next){
    console.log('other auth');
    next();
});
*/

module.exports = router;
/*
 * 后台的全局变量，该变量记录所有后台的数据
 * @author: machi
 */


var config = {
    sql: {
        hostName: '172.27.11.190',
        user: 'root',
        password: 'echo890202',
        database: 'myself',
        suffix: 'mc_'
    },
    upload: {
        uploadDir: './public/static/uploads/',
        uploadUrl: '/static/uploads/'
    },
    blog: {
        title: 'Loyuk_MaC',
        subtitle: '悲观的思考，乐观的生活',
        authorImgUrl: '/static/default/images/author-img.png'
    }
}


module.exports = config;
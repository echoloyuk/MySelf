var version = '0.9.0';
seajs.config({
    alias: {
        //init: 'init.js',
        jquery: 'jquery.js'
        
    },
    map: [
        ['.css', '.css?v=' + version],
        ['.js', '.js?v=' + version]
    ],
    // preload: ['init'], // jquery所有版本适用
    preload: ['jquery'],// jquery1.10以上使用
    debug: true
});
var version = '0.9.0';
seajs.config({
    alias: {
        //init: 'init.js',
        jquery: 'js/jquery.js',

        //helloworld
        marked: 'components/editor/marked.js', //markdown parser
        form: 'components/editor/jquery.form.js', //jquery.form.js
        HelloWorld: 'components/editor/components/helloworld.js',
        TextArea: 'components/editor/components/textarea.js',
        EditorCSS: 'components/editor/css/editor.css',
        MarkdownParser: 'components/editor/components/markdownparser.js',
        Util: 'components/editor/components/util.js'
        
    },
    map: [
        ['.css', '.css?v=' + version],
        ['.js', '.js?v=' + version]
    ],
    debug: true,
    // preload: ['init'], // jquery所有版本适用
    preload: ['jquery'],// jquery1.10以上使用
    debug: true,
    base: './public/static/'
});
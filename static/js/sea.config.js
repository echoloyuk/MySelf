var version = '0.9.0';
seajs.config({
    alias: {
        //init: 'init.js',
        jquery: 'jquery.js',
        marked: 'editor/marked.js', //markdown parser
        form: 'editor/jquery.form.js', //jquery.form.js

        //helloworld
        HelloWorld: 'editor/components/helloworld.js',
        TextArea: 'editor/components/textarea.js',
        EditorCSS: 'editor/css/editor.css',
        MarkdownParser: 'editor/components/markdownparser.js',
        Util: 'editor/components/util.js'
        
    },
    map: [
        ['.css', '.css?v=' + version],
        ['.js', '.js?v=' + version]
    ],
    debug: true,
    // preload: ['init'], // jquery所有版本适用
    preload: ['jquery'],// jquery1.10以上使用
    debug: true
});
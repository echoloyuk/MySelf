var version = '0.9.0';
var theme = 'default';

seajs.config({
    alias: {
        //init: 'init.js',
        jquery: 'js/jquery.js',
        theme: theme + '/css/main.css',

        //helloworld
        marked: 'components/editor/marked.js', //markdown parser
        form: 'components/editor/jquery.form.js', //jquery.form.js
        HelloWorld: 'components/editor/components/helloworld.js',
        TextArea: 'components/editor/components/textarea.js',
        EditorCSS: 'components/editor/css/editor.css',
        MarkdownParser: 'components/editor/components/markdownparser.js',
        Util: 'components/editor/components/util.js',
        //masonry
        masonry: 'components/masonry/masonry.min.js',

        //components
        Dialog: 'js/dialog.js',
        Mask: 'js/mask.js',

        //components css
        DialogCSS: theme + '/css/dialog.css',
        MaskCSS: theme + '/css/mask.css'
        
    },
    map: [
        ['.css', '.css?v=' + version],
        ['.js', '.js?v=' + version]
    ],
    debug: true,
    // preload: ['init'], // jquery所有版本适用
    preload: ['jquery'],// jquery1.10以上使用
    debug: true,
    base: '/static/'
});
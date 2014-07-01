modules.require(['vow'], function(Vow) {

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    url = require('url'),
    morgan = require('morgan'),
    vm = require('vm'),
    ctx = vm.createContext({
        Vow: Vow,
        console: console
    }),
    pathToBundle = path.resolve('.', 'bundles', 'index');

app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.static(pathToBundle));

var BEMTREE = fs.readFileSync(path.join(pathToBundle, 'index.bemtree.js'), 'utf-8'),
    BEMHTML = require(path.join(pathToBundle, 'index.bemhtml.js')).BEMHTML;

vm.runInContext(BEMTREE, ctx);

BEMTREE = ctx.BEMTREE;

app.get('/', function(req, res) {
    var search = url.parse(req.url, true).query;

    BEMTREE.apply({
        block: 'page',
        title: 'Twitjeet!',
        styles: [{ elem: 'css', url: '_index.css' }],
        mods: { theme: 'normal' },
        content: [
            'Hello world!'
        ]
    }).then(function(bemjson) {
        res.end(BEMHTML.apply(bemjson));
    });

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

});

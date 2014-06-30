modules.require(['vow', 'twitjeet'], function(Vow, twitjeet) {

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    moment = require('moment'),
    morgan = require('morgan'),
    //middleware = require('enb/lib/server/server-middleware'),
    vm = require('vm'),
    ctx = vm.createContext({
        Vow: Vow,
        console: console,
        twitjeet: twitjeet
    }),
    pathToBundle = path.resolve('.', 'bundles', 'index');

app
    .disable('x-powered-by')
    .use(morgan('dev'))
    //.use(middleware.createMiddleware({}))
    .use(express.static(pathToBundle));

var BEMTREE = fs.readFileSync(path.join(pathToBundle, 'index.bemtree.js'), 'utf-8'),
    BEMHTML = require(path.join(pathToBundle, 'index.bemhtml.js')).BEMHTML;

vm.runInContext(BEMTREE, ctx);

BEMTREE = ctx.BEMTREE;

app.get('/', function(req, res) {
    BEMTREE.apply({
        block: 'page',
        title: 'Twitjeet!',
        styles: [{ elem: 'css', url: '_index.css' }],
        scripts: [{ elem: 'js', url: '_index.js' }],
        mods: { theme: 'normal' },
        content: {
            block: 'twitjeet',
            query: 'bem',
            count: 10
        }
    }).then(function(bemjson) {
        res.end(BEMHTML.apply(bemjson));
    });

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

});

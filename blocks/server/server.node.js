modules.require(['vow', 'twitjeet'], function(Vow, twitjeet) {

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    url = require('url'),
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
        content: [
            {
                block: 'twitjeet',
                query: url.parse(req.url, true).query.query || '@bem_ru',
                count: 10
            },
            {
                block: 'icon',
                mods: { type: 'bem' },
                url: 'data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20101.5%2083.9%22%20enable-background%3D%22new%200%200%20101.5%2083.9%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Crect%20fill%3D%22%23000%22%20width%3D%22100%25%22%20height%3D%22100%25%22%2F%3E%3Crect%20x%3D%2259.9%22%20y%3D%2271.8%22%20fill%3D%22%23fff%22%20width%3D%2241.5%22%20height%3D%2212%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M46%2C23.8H23.8V0H0v71.9l46%2C0c7.7%2C0%2C13.9-6.2%2C13.9-13.9V37.7C59.9%2C30%2C53.7%2C23.8%2C46%2C23.8z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
            }
        ]
    }).then(function(bemjson) {
        res.end(BEMHTML.apply(bemjson));
    });

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

});

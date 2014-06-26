!function() {

    var fs = require('fs'),
        path = require('path'),
        express = require('express'),
        app = express(),
        url = require('url'),
        querystring = require('querystring'),
        moment = require('moment'),
        morgan = require('morgan'),
        //middleware = require('enb/lib/server/server-middleware'),
        pathToBundle = path.join('.', 'bundles', 'index');

    var config = require('./twitjeet.config.js'),
        twit = new (require('twit'))(config),
        twitterText = require('twitter-text');

    app
        .disable('x-powered-by')
        .use(morgan('dev'))
        //.use(middleware.createMiddleware({}))
        .use(express.static(pathToBundle));

    var BEMTREE = require(path.join(path.resolve(pathToBundle), 'index.bemtree.js')).BEMTREE,
        BEMHTML = require(path.join(path.resolve(pathToBundle), 'index.bemhtml.js')).BEMHTML;

    app.get('/search', function(req, res) {
        var search = url.parse(req.url, true).query,
            query = querystring.escape(search.query),
            bemjson = {
                block: 'twitjeet',
                twit: twit,
                twitterText: twitterText,
                query: query,
                count: 5
            };

        /*twit.get('search/tweets', { q: query, count: 10 }, function(err, result) {
            res.end(JSON.stringify(result.statuses.map(function(status) {
                return twitterText.autoLink(twitterText.htmlEscape(status.text));
            })));
        });*/

        BEMTREE.apply(bemjson).then(function(result) {
            res.end(BEMHTML.apply(result));
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

}();

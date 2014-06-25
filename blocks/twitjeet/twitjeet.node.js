!function() {

    var fs = require('fs'),
        PATH = require('path'),
        express = require('express'),
        app = express(),
        url = require('url'),
        querystring = require('querystring'),
        moment = require('moment'),
        morgan = require('morgan'),
        pathToBundle = PATH.join('.', 'bundles', 'index');

    var config = {
            consumer_key: 'UBvIdyLNscToLGMJjehTVjsyn',
            consumer_secret: 'ExZP2gdZDFKaZGAAP6mTwUb0b4AUUfl1uOHw5A6xmS9g3b48Cr',
            access_token: '2451167779-pZURihZ05FykhQhn4YyUnlhSHNxsRoJt8OWqSnv',
            access_token_secret: 'udRBOFvlZhWW8TNBogo03Qy7YMlSbICIgiUtSuXl8Kexr'
        },
        twit = new (require('twit'))(config),
        twitterText = require('twitter-text');

    app
        .disable('x-powered-by')
        .use(morgan('dev'))
        .use(express.static(pathToBundle));

    app.get('/search', function(req, res) {
        var search = url.parse(req.url, true).query,
            query = querystring.escape(search.query);

        twit.get('search/tweets', { q: query, count: 10 }, function(err, result) {
            res.end(JSON.stringify(result.statuses.map(function(status) {
                return twitterText.autoLink(twitterText.htmlEscape(status.text));
            })));
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

}();

modules.define('twitjeet', function(provide) {
    var Twit = require('twit'),
        config = require('./twitjeet.config.js');

    provide({
        twit: new Twit(config),
        twitterText: require('twitter-text')
    });
});

var requireOrEval = require('enb/lib/fs/require-or-eval');
var asyncRequire = require('enb/lib/fs/async-require');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('html-from-bemjson')
    .target('destTarget', '?.html')
    .useSourceFilename('bemxjstTarget', '?.bemxjst.js')
    .useSourceFilename('bemjsonTarget', '?.bemjson.js')
    .useSourceListFilenames('inlineTargets', [])
    .builder(function (bemxjstFilename, bemjsonFilename) {
        dropRequireCache(require, bemjsonFilename);
        return requireOrEval(bemjsonFilename).then(function (json) {
            dropRequireCache(require, bemxjstFilename);
            return asyncRequire(bemxjstFilename).then(function (bemxjst) {
                return bemxjst.BEMTREE.apply(json).then(function(bemjson) {
                    return bemxjst.BEMHTML.apply(bemjson);
                });
            });
        });
    })
    .createTech();

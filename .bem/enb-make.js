module.exports = function(config) {

    config.node('bundles/index', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), { levels: getLevels() } ],
            [ require('enb/techs/file-provider'), { target: '?.bemjson.js' } ],
            require('enb/techs/bemdecl-from-bemjson'),
            [ require('enb-modules/techs/deps-with-modules') ],
            require('enb/techs/files'),

            require('enb-roole/techs/css-roole'),
            [ require('enb-borschik/techs/borschik'), { sourceTarget: '?.css', destTarget: '_?.css', minify: true, freeze: true } ],

            require('enb-diverse-js/techs/browser-js'),
            [ require('enb-modules/techs/prepend-modules'), { source: '?.browser.js', target: '?.js' } ],
            [ require('enb-borschik/techs/borschik'), { sourceTarget: '?.js', destTarget: '_?.js', minify: true } ],

            [ require('enb-bemxjst/techs/bemtree'), { devMode: false } ],
            [ require('enb-bemxjst/techs/bemhtml'), { devMode: false } ],
            [ require('enb/techs/file-merge'), { sources: ['?.bemtree.js', '?.bemhtml.js'], target: '?.bemxjst.js' } ],
            require('./enb-techs/html-from-bemjson')

        ]);
        nodeConfig.addTargets(['_?.css', '_?.js', '?.html']);

        function getLevels() {
            return [
                { 'path':'libs/bem-core/common.blocks','check':false },
                { 'path':'libs/bem-core/desktop.blocks','check':false },
                { 'path':'blocks','check':true }
            ].map(function(l) { return config.resolvePath(l); });
        }
    });

};

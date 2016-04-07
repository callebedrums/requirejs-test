

(function (require) {
    'use strict';

    require.config({
        baseUrl: '/',
        paths: {
            'jquery': 'components/jquery/dist/jquery.min'
        },
        shim: {
            'jquery': { exports: 'jQuery' }
        },
        deps: [
            'js/main.js'
        ]
    });
}) (require);
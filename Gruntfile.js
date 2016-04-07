
module.exports = function (grunt) {

    var modRewrite = require('connect-modrewrite');

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 7000,
                    hostname: 'localhost',
                    base: ['dist'],
                    livereload: true,
                    open: true,
                    middleware: function (connect, options, middleware) {
                        middleware.unshift(modRewrite(['^[^\\.]*$ /index.html [L]']));
                        return middleware;
                    }
                }
            }
        },
        watch: {
            dev: {
                options: { // Live reload is now specific to this task
                    livereload: true
                },
                files: ['public/js/**/*.js']
            }
        },
        requirejs: {
            compile: {
                options: {
                    appDir: "public/",
                    baseUrl: ".",
                    dir: "dist/",
                    optimize: 'uglify',
                    mainConfigFile: './public/js/require-config.js',
                    modules: [{
                        name: 'js/main'
                    }],
                    logLevel: 0,
                    findNestedDependencies:true,
                    inlineText:true,
                    //fileExclusionRegExp: /^(\.)|(components)/,
                    preserveLicenseComments: false,
                    generateSourceMaps: true
                    //out: 'js/app.js'
                }
            }
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('serve', ['connect:server', 'watch']);
};
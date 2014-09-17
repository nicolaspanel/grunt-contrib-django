'use strict';

var paths = {
    js: [
        '*.js',
        'tasks/*.js',
        'test/*.js',
    ]
};

module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint:all', 'mochacov'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: paths.js,
                options: {
                    jshintrc: true
                }
            }
        },
        mochacov: {
            options: {
                reporter: 'spec',
                require: ['should']
            },
            all: ['test/*.js']
        }
    });

    require('load-grunt-tasks')(grunt);

    // Registers a task to test the task
    grunt.registerTask('test', [
        'jshint',
        'mochacov'
    ]);

    grunt.registerTask('default', ['watch']);
};

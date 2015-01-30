'use strict';

var _ = require('lodash'),
    assert = require('assert'),
    cmd = require('./cmd');

module.exports = function(grunt){

    grunt.task.registerMultiTask('django-manage', 'Run std manage.py commands', function(){
        var done = this.async() || function(){},
        	options = this.options() || {};

        assert(options.command, 'command name required');
        var args = [
            '{0}manage.py'.format(options.manage_path || ''),
            options.command
        ].concat(options.args || []);
        console.log(args);
        cmd('python', args , {})
            .progress(function(data){
                if (options.verbose){
                    data = data.toString();
                    grunt.log.write(data);
                }
            })
            .fail(function(err){
                grunt.fail.fatal('Command "django-manage:{0}" failed. {1}'.format(options.command, err));
                done(false);
            })
            .done(function(stdout){
                grunt.log.ok('Command "django-manage:{0}" ran successfully'.format(options.command));
                done(true);
            });
    });

    grunt.task.registerMultiTask('django-admin', 'Run django-admin.py commands', function(){
        var done = this.async() || function(){},
            options = this.options() || {};

        assert(options.command, 'command name required');
        assert(options.app, 'app name required');

        var args = [options.command].concat(options.args || []);

        cmd('django-admin.py', args , { cwd : '{0}/{1}'.format(process.cwd(), options.app) })
            .progress(function(data){
                if (options.verbose){
                    data = data.toString();
                    grunt.log.write(data);
                }
            })
            .fail(function(err){
                grunt.fail.fatal('command "django-admin:{0}" failed. {1}'.format(options.command, err));
                done(false);
            })
            .done(function(stdout){
                grunt.log.ok('command "django-admin:{0}" ran successfully'.format(options.command));
                done(true);
            });
    });
};

'use strict';

var _ = require('lodash'),
	CmdBuilder = require('./cmdBuilder').CmdBuilder, 
    spawn = require('child_process').spawn,
    child = null;

module.exports = function(grunt){
    var cmdBuilder = new CmdBuilder(grunt); 
    var runCommand = function(cmd, args, done, options) {
	    options = _.extend({ cwd: undefined, env: process.env }, options || {});
	    var verbose = options.verbose || false;
	    grunt.log.ok('Running command: ' + (cmd + args.join(' ')).yellow);
	    if (verbose){
	        grunt.log.ok('Verbose option activated');
	    }
	    
	    child = spawn(cmd, args, options);
	    child.stdout.on('data', function (data) {
	        if (verbose){
	            grunt.log.write('stdout:: ', data);
	        }
	    });

	    child.stderr.on('data', function (data) {
	        grunt.log.write('stderr:: ', data);
	    });

	    child.on('close', function (code) {
	        //grunt.log.writeln('child process exited with code : ' + code);
	        if (code > 0) {
	            grunt.fail.fatal('Command failed, exited with code {0}'.format(code));
	            done(false);
	        } 
	        else {
	            grunt.log.ok('Command ran successfully');
	            done(true);
	        }
	        process.exit(code);
	    });
	};

    grunt.task.registerMultiTask('django-manage', 'Run std manage.py commands', function(){
        var done = this.async() || function(){},
        	options = this.options() || {},
        	args = cmdBuilder.getDjangoManageArgs(options);
        runCommand('python', args, done, options);
    });

    grunt.task.registerMultiTask('django-admin', 'Run django-admin.py commands', function(){
        var done = this.async() || function(){},
        	options = this.options() || {},
        	workingDir = '{cwd}/{app}'.format({
        		cwd: process.cwd(),
        		app: options.app
        	}),
        	args = cmdBuilder.getDjangoAdminArgs(options);
        runCommand('django-admin.py', args, done, _.extend({ 
        	verbose: false,
        	cwd: workingDir
        }, options));
    });
};

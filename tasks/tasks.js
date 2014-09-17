'use strict';

var _ = require('lodash'),
	CmdBuilder = require('./cmdBuilder').CmdBuilder, 
    exec = require('child_process').exec,
    child = null;

module.exports = function(grunt){
    var cmdBuilder = new CmdBuilder(grunt); 
    var runCommand = function(cmd, done, verbose) {
	    verbose = verbose || false;
	    grunt.log.ok('Running ' + cmd.yellow + ' command from ' + process.cwd());
	    if (verbose){
	        grunt.log.ok('Verbose option activated');
	    }
        child = exec(cmd);

	    child.stdout.on('data', function (data) {
	        if (verbose){
	            grunt.log.write(data);
	        }
	    });

	    child.stderr.on('data', function (data) {
	        grunt.log.write(data);
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
        	cmd = cmdBuilder.getDjangoManageCmd(options);
        runCommand(cmd, done, options.verbose || false);
    });

    grunt.task.registerMultiTask('django-admin', 'Run django-admin.py commands', function(){
        var done = this.async() || function(){},
        	options = this.options() || {},
        	cmd = cmdBuilder.getDjangoAdminCmd(options);
        runCommand(cmd, done, options.verbose || false);
    });
};

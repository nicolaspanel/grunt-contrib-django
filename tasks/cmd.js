'use strict';

var cp = require('child_process');
var Q = require('q');
var PThrottler = require('p-throttler');


var throttler = new PThrottler(5);

function executeCmd(command, args, options, background) {
    var cProcess;
    var stderr = '';
    var stdout = '';
    var deferred = Q.defer();


    if(background){
        var bgExp = background === true ? 'Quit the server with CONTROL-C' : background;
        setTimeout(function(){
    		deferred.notify({status: 'Listening for "' + bgExp.toString() + '" on STDOUT to complete task' });
    	},0);
        options.detached = true;
    }

    // Buffer output, reporting progress
    cProcess = cp.spawn(command, args, options);

    cProcess.stdout.on('data', function (data) {
        data = data.toString();
        deferred.notify({msg:data});
        stdout += data;
        if(background){

            if(data.match(bgExp)){

                process.on('exit', function() {
                    process.kill( -cProcess.pid, 'SIGKILL' );
                });

                process.once('SIGINT', function() {
                    process.kill( -cProcess.pid, 'SIGKILL' );
                    process.kill(-process.pid, 'SIGINT');
                });
                deferred.resolve([stdout, stderr]);
            }
        }
    });
    cProcess.stderr.on('data', function (data) {
        data = data.toString();
        deferred.notify({error:data});
        stderr += data;
    });

    // If there is an error spawning the command, reject the promise
    cProcess.on('error', function (error) {
        return deferred.reject(error);
    });

    // Listen to the close event instead of exit
    // They are similar but close ensures that streams are flushed
    cProcess.on('close', function (code) {
        var fullCommand;
        var error;

        if (code) {
            // Generate the full command to be presented in the error message
            if (!Array.isArray(args)) {
                args = [];
            }

            fullCommand = command;
            fullCommand += args.length ? ' ' + args.join(' ') : '';

            // Build the error instance
            error = new Error('Failed to execute "{cmd}", exit code of #{code}ECMDERR'.format({
                cmd: fullCommand,
                code: code
            }));

            return deferred.reject(error);
        }

        return deferred.resolve([stdout, stderr]);
    });

    return deferred.promise;
}

function cmd(command, args, options, background) {
    return throttler.enqueue(executeCmd.bind(null, command, args, options, background));
}

module.exports = cmd;

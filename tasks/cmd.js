'use strict';

var cp = require('child_process');
var Q = require('q');
var PThrottler = require('p-throttler');


var throttler = new PThrottler(5);

function executeCmd(command, args, options) {
    var process;
    var stderr = '';
    var stdout = '';
    var deferred = Q.defer();

    // Buffer output, reporting progress
    process = cp.spawn(command, args, options);
    process.stdout.on('data', function (data) {
        data = data.toString();
        deferred.notify(data);
        stdout += data;
    });
    process.stderr.on('data', function (data) {
        data = data.toString();
        deferred.notify(data);
        stderr += data;
    });

    // If there is an error spawning the command, reject the promise
    process.on('error', function (error) {
        return deferred.reject(error);
    });

    // Listen to the close event instead of exit
    // They are similar but close ensures that streams are flushed
    process.on('close', function (code) {
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

function cmd(command, args, options) {
    return throttler.enqueue(executeCmd.bind(null, command, args, options));
}

module.exports = cmd;
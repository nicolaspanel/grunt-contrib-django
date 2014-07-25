/**
 * @fileOverview
 * Tasks for running Djangos manage.py commands
 *
 * @module DjangoManage
 * @requires child_process.spawn
 */
var spawn = require('child_process').spawn;

module.exports = function (grunt) {

    var command;

    /**
     * Kills a running node spawn command
     */
    function kill () {
        if (command) {
            command.kill();
        }
    }

    /**
     * Runs the Django command and uses done with async or not
     * @private
     * @param  {String}   cmd  The Django command to run (after manage.py)
     * @param  {Function} done Contains how to say done, async or not
     */
    function runCommand (cmd, done) {
        var defaultCmd = [
                'python',
                'manage.py'
            ],
            run;

        defaultCmd.push(cmd);
        run = defaultCmd.join(' ');

        if (process.platform === 'win32') {
            command = spawn(
                'cmd.exe',
                ['/s', '/c', '"' + run + '"'],
                {windowsVerbatimArguments: true}
            );
        } else {
            command = spawn('/bin/sh', ['-c', run]);
        }

        var stderr_output = '';
        command.stderr.on('data', function(data) {
            stderr_output += data;
        });

        command.on('close', function (code) {
            if (code > 0) {
                grunt.log.error('Django command "' + cmd + '" exited with code ' + code);
                if (stderr_output) {
                    grunt.log.error('stderr was:\n' + stderr_output);
                }
                grunt.fail.fatal('Django management command failed.');
                done(false);
            } else {
                done(true);
            }
        });
    }

    /**
     * Sets on exit of task what to do
     */
    process.on('exit', function () {
        kill();
    });

    /**
     * TASK: Runs Django sync db.
     *
     * @name django-sync-db
     * @memberOf module:DjangoManage
     */
    grunt.task.registerMultiTask('django-sync-db', function () {
        var ops = this.options(),
            args = [
                'syncdb',
                '--noinput',
                '--settings=' + ops.app + '.settings.' + ops.settings
            ],
            done = ops.async ? this.async() : function () {},
            cmd;

        cmd = args.join(' ');

        grunt.log.ok(
            'Django server syncing for app: ' + ops.app + ' with settings: ' +
                ops.settings.green
        );
        grunt.log.ok('Using command: ' + cmd.grey);

        runCommand(cmd, done);
    });

    /**
     * TASK: Loads a Django fixture.
     *
     * @name django-load-fixture
     * @memberOf module:DjangoManage
     */
    grunt.task.registerMultiTask('django-load-fixture', function () {
        var ops = this.options(),
            fixtures = ops.fixtures.join(' '),
            args = [
                'loaddata',
                fixtures,
                '--settings=' + ops.app + '.settings.' + ops.settings
            ],
            done = ops.async ? this.async() : function () {},
            cmd;

        cmd = args.join(' ');

        grunt.log.ok(
            'Loading Django fixture for app: ' + ops.app + ' with settings: ' +
                ops.settings.green
        );
        grunt.log.ok('Using command: ' + cmd.grey);

        runCommand(cmd, done);
    });

};

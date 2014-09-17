'use strict';

var sf = require('string-format'),
    _ = require('lodash');

var CmdBuilder = function(){
};

CmdBuilder.prototype.getDjangoManageCmd = function(options) {
    options = _.extend({ command: ''}, options || {});

    var args = [];
    if (options.command && options.command !== ''){
        args.push(options.command);
    }
    if (options.args && options.args.length > 0){
        args = args.concat(options.args);
    }
    return 'python manage.py {args}'.format({
        args: args.join(' ')
    });
};

CmdBuilder.prototype.getDjangoAdminCmd = function(options) {
    options = _.extend({ command: '' }, options || {});
    var args = [];
    if (options.command && options.command !== ''){
        args.push(options.command);
    }
    if (options.args && options.args.length > 0){
        args = args.concat(options.args);
    }
    return 'cd {app}/ && django-admin.py {args}'.format({
        app: options.app,
        args: args.join(' ')
    });
};

module.exports.CmdBuilder = CmdBuilder;
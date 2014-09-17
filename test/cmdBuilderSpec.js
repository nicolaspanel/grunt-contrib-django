'use strict';

var _ = require('lodash'),
	CmdBuilder = require('../tasks/cmdBuilder').CmdBuilder,
	Grunt = require('./mocks').Grunt;

describe('Django command builder', function(){
	var builder,
		defaultOptions;
	
	beforeEach(function(){
		builder = new CmdBuilder();
		defaultOptions = { 
			app: 'myApp',
			verbose: false 
		};
	});
	
	describe('manage.py', function(){
		describe('without arguments', function(){
			var options,
                expectedCmd = 'python manage.py';
			beforeEach(function(){
				options = _.extend(defaultOptions, {});
			});
			
			it('should return "manage.py"', function(){
				builder.getDjangoManageCmd(options).should.equal(expectedCmd);
			});
		});

		it('should handle test cmd', function(){
			var options = _.extend(defaultOptions, {
					command: 'test', 
					args: [
	                    'myApp/tests',
	                    '--pattern="*Specs.py"',
	                    '--settings="myApp.settings.tests"'
	                ]
				}),
				expectedCmd = 'python manage.py {cmd} {args}'.format({
					cmd: options.command,
					args: options.args.join(' ').trim()
				});
			builder.getDjangoManageCmd(options).should.eql(expectedCmd);
		});
	});

	describe('django-admin.py', function(){
		it('should handle compilemessages cmd', function(){
			var expectedCmd = 'cd myApp/ && django-admin.py compilemessages',
                options = _.extend(defaultOptions, {
				command: 'compilemessages'
			});
			builder.getDjangoAdminCmd(options).should.eql(expectedCmd);
		});
	});
	
});
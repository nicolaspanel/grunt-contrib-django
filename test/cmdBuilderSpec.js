'use strict';

var _ = require('lodash'),
	CmdBuilder = require('../tasks/cmdBuilder').CmdBuilder,
	Grunt = require('./mocks').Grunt;

describe('Django command builder', function(){
	var builder,
		defaultOptions = { 
			app: 'myAppp', 
			verbose: false 
		};
	
	beforeEach(function(){
		builder = new CmdBuilder();
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
	});

	describe('django-admin.py', function(){
		it('should handle compile messages', function(){
			var expectedCmd = 'cd myApp/ && django-admin.py compilemessages',
                options = _.extend(defaultOptions, {
				command: 'compilemessages'
			});
			builder.getDjangoAdminCmd(options).should.eql(expectedCmd);
		});
	});
	
});
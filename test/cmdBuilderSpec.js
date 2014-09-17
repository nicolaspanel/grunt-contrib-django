'use strict';

var _ = require('lodash'),
	CmdBuilder = require('../tasks/cmdBuilder').CmdBuilder,
	Grunt = require('./mocks').Grunt;

describe('Django command builder', function(){
	var cmdBuilder,
		defaultOptions = { 
			app: 'myAppp', 
			verbose: false 
		};
	
	beforeEach(function(){
		cmdBuilder = new CmdBuilder();
	});
	
	describe('manage.py', function(){
		describe('without arguments', function(){
			var options;
			beforeEach(function(){
				options = _.extend(defaultOptions, {});
			});
			
			it('should return "manage.py"', function(){
				cmdBuilder.getDjangoManageArgs(options).should.eql(['manage.py']);
			});
		});
	});

	describe('django-admin.py', function(){
		it('should handle compile messages', function(){
			var options = _.extend(defaultOptions, {
				command: 'compilemessages'
			});
			cmdBuilder.getDjangoAdminArgs(options).should.eql(['compilemessages']);
		});
	});
	
});
'use strict';

var Grunt = require('./mocks').Grunt;

describe('tasks', function(){
	var tasks,
		grunt;
	
	beforeEach(function(){
		grunt = new Grunt();
		tasks = require('../tasks/tasks')(grunt);
	});
	it('should regiter manage.py tasks', function(){
		grunt.task.registerMultiTask.withArgs('django-manage').calledOnce.should.equal(true);
	});
	it('should regiter django-admin.py tasks', function(){
		grunt.task.registerMultiTask.withArgs('django-admin').calledOnce.should.equal(true);
		//console.log(grunt.task.registerMultiTask);
	});
	
	it('should not regiter single tasks', function(){
		grunt.task.registerTask.called.should.equal(false);
	});	
});


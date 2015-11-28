'use strict';

var expect = require('expect.js');
var Grunt = require('./mocks').Grunt;

describe('tasks', function(){
	var tasks,
		grunt;
	
	beforeEach(function(){
		grunt = new Grunt();
		tasks = require('../tasks/tasks')(grunt);
	});
	it('should register manage.py tasks', function(){
		expect(grunt.task.registerMultiTask.withArgs('django-manage').calledOnce).to.be.ok();
	});
	it('should register django-admin.py tasks', function(){
        expect(grunt.task.registerMultiTask.withArgs('django-admin').calledOnce).to.be.ok();
	});
	
	it('should not register single tasks', function(){
        expect(grunt.task.registerTask.called).not.to.be.ok();
	});	
});


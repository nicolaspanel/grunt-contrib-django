'use strict';
var sinon = require('sinon');

var MockGrunt = function(){
	this.task = {
		registerMultiTask: sinon.spy(),
		registerTask: sinon.spy(),
	};
	this.log = {
		ok: sinon.spy(),
		write: sinon.spy(),
		writeln: sinon.spy(),
	};
	this.fail = {
		fatal: sinon.spy()
	};	
};

exports.Grunt = MockGrunt;
/**
 * @file
 * Defines the Core.cli.plugin.mocha.BaseMochaCommand class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @version 1.0
 * @copyright 2019 C2C Schools, LLC
 * @license MIT
 */

"use strict";

// Load dependencies using the Core Framework
const { _, MOCHA } = Core.deps( "_", "mocha" );

/**
 * A base class for commands that run Mocha.
 *
 * @memberOf Core.cli.plugin.mocha
 * @extends Core.cli.command.BaseModuleCommand
 */
class BaseMochaCommand extends Core.cls( "Core.cli.command.BaseModuleCommand" ) {

	$construct( mochaWrapper ) {

		// Require the `mochaWrapper` class dep
		this._mochaWrapper = this.$require( "mochaWrapper", {
			instanceOf: "Core.cli.plugin.mocha.MochaWrapper",
		} );

	}

	/**
	 * Mocha
	 *
	 * @access public
	 * @default null
	 * @type {Core.cli.plugin.mocha.MochaWrapper}
	 */
	get mochaWrapper() {
		return this._mochaWrapper;
	}

	async getTestGlobals() {
		return this._getModuleFiles( "test/**/*.global.js" );
	}

	async getLibFiles() {
		return this._getModuleFiles( "lib/**/*.js" );
	}

	async getTestFiles() {
		return this._getModuleFiles( "test/**/*.spec.js" );
	}

	async _getModuleFiles( patterns ) {

		// Locals
		let me = this;

		// Resolve the root path of the target project
		let moduleRoot = await me.getModuleRoot();

		// Do a glob search
		return moduleRoot.searchIn( patterns, {
			returnObjects    : false,
			allowDirectories : false
		} );

	}

	async runMocha( opts ) {

		// Locals
		let me = this;

		// Resolve the test files
		let testFiles = await me.getTestFiles();

		// Resolve the require files
		let requireFiles = await me.getTestGlobals();

		// Apply default options
		opts = _.defaults( {}, opts, {
			files   : testFiles,
			require : requireFiles
		} );

		// Fetch the Mocha wrapper
		let mocha = me.mochaWrapper;

		// Execute Mocha
		return mocha.run( opts );

	}


	_todoClearRequireCache() {

		Object.keys( require.cache ).forEach( function ( key ) {
			if ( typeof filterFunc !== "function" || !filterFunc( key ) ) {
				delete require.cache[ key ];
			}
		} );

	}

}

module.exports = BaseMochaCommand;

/*
 * @param {boolean} [options.allowUncaught] - Propagate uncaught errors?
 * @param {boolean} [options.asyncOnly] - Force `done` callback or promise?
 * @param {boolean} [options.bail] - Bail after first test failure?
 * @param {boolean} [options.checkLeaks] - If true, check leaks.
 * @param {boolean} [options.delay] - Delay root suite execution?
 * @param {boolean} [options.enableTimeouts] - Enable timeouts?
 * @param {string} [options.fgrep] - Test filter given string.
 * @param {boolean} [options.forbidOnly] - Tests marked `only` fail the suite?
 * @param {boolean} [options.forbidPending] - Pending tests fail the suite?
 * @param {boolean} [options.fullStackTrace] - Full stacktrace upon failure?
 * @param {string[]} [options.global] - Variables expected in global scope.
 * @param {RegExp|string} [options.grep] - Test filter given regular expression.
 * @param {boolean} [options.growl] - Enable desktop notifications?
 * @param {boolean} [options.hideDiff] - Suppress diffs from failures?
 * @param {boolean} [options.ignoreLeaks] - Ignore global leaks?
 * @param {boolean} [options.invert] - Invert test filter matches?
 * @param {boolean} [options.noHighlighting] - Disable syntax highlighting?
 * @param {string} [options.reporter] - Reporter name.
 * @param {Object} [options.reporterOption] - Reporter settings object.
 * @param {number} [options.retries] - Number of times to retry failed tests.
 * @param
 * @param
 * @param {string} [options.ui] - Interface name.
 * @param {boolean} [options.color] - Color TTY output from reporter?
 * @param {boolean} [options.useInlineDiffs] - Use inline diffs?
 */

/**
 * @file
 * Defines the Core.cli.plugin.mocha.MochaWrapper class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @version 1.0
 * @copyright 2019 C2C Schools, LLC
 * @license MIT
 */

"use strict";

// Load dependencies using the Core Framework
const { _, TIPE, MOCHA } = Core.deps( "_", "tipe", "mocha" );

/**
 * Wraps the mocha library
 *
 * @memberOf Core.cli.plugin.mocha
 * @extends Core.abstract.Component
 */
class MochaWrapper extends Core.cls( "Core.abstract.Component" ) {

	/*
	$construct() {
		console.log( "--- Core.cli.plugin.mocha.MochaWrapper :: $construct ---" );
	}

	$ready() {
		console.log( "--- Core.cli.plugin.mocha.MochaWrapper :: $ready ---" );
	}
	*/

	async run( opts ) {

		// Locals
		let me = this;

		// Apply default options
		opts = _.defaults( {}, opts, me._defaultMochaOptions );

		// Extract the files
		let files = opts.files;
		delete opts.files;

		// Clear the require cache, if desired..
		if( opts.clearRequireCache === true ) {

			let clearOpts = {};

			// Also clear the Core singleton cache, if desired..
			if( opts.clearCoreSingletons === true ) {
				clearOpts.singletons = true;
			}

			// Clear the caches
			Core.clearCaches( clearOpts );

			// Remove the options
			delete opts.clearRequireCache;
			delete opts.singletons;

		}

		// If we cleared the singleton cache then we may
		// need to reload the core framework...
		if( opts.reloadCoreFramework ) {
			require( Core.commonInitPath );
		}

		// Extract any `require` files
		let requireFiles = opts.require;
		_.each( requireFiles, ( rfPath ) => {
			require( rfPath );
		} );

		// Init a new Mocha object
		let mocha = new MOCHA( opts );

		// Add the files to mocha
		_.each( files, function( file ) {
			mocha.addFile( file );
		} );

		// Promisify
		return new Promise(

			function( resolve, reject ) {

				mocha.run(
					function( failureCount ) {
						resolve( failureCount );
					}
				);

			}

		);

	}

	get _defaultMochaOptions() {
		return {
			files               : [],    // - Not part of Mocha -
			require             : [],    // - Not part of Mocha -
			clearRequireCache   : false, // - Not part of Mocha -
			clearCoreSingletons : false, // - Not part of Mocha -
			reloadCoreFramework : false, // - Not part of Mocha -
			slow                : 300,   // {number} [options.slow] - Slow threshold value.
			timeout             : 5000,  // {number|string|boolean} [options.timeout] - Timeout threshold value.
		};
	}

	get mocha() {
		//return new MOCHA( this.mochaOptions );
	}

}

module.exports = MochaWrapper;


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


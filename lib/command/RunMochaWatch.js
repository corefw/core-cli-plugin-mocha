/**
 * @file
 * Defines the Core.cli.plugin.mocha.command.RunMochaWatch class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @version 1.0
 * @copyright 2019 C2C Schools, LLC
 * @license MIT
 */

"use strict";

// Load dependencies using the Core Framework
const { _ } = Core.deps( "_" );


/**
 * Provides the 'tdd' command.
 *
 * @memberOf Core.cli.plugin.mocha.command
 * @extends Core.cli.plugin.mocha.command.BaseMochaCommand
 */
class RunMochaWatch extends Core.cls( "Core.cli.plugin.mocha.command.BaseMochaCommand" ) {

	static get command() {
		return "tdd";
	}

	static get description() {
		return "Runs Mocha on the project detected at or above the current working directory and re-runs Mocha whenever the source code is changed.";
	}

	static get examples() {
		return [ "test" ];
	}

	static async addToCommander( cmd, outputHandler ) {
		cmd.option( "-d, --details", "Shows additional command information" );
	}

	async execute() {

		// Locals
		let me = this;

		// Gather all of the files that we want to watch...
		let testFiles 	= await me.getTestFiles();
		let globalFiles = await me.getTestGlobals();
		let libFiles 	= await me.getLibFiles();

		// Merge the files into a single array
		let watchFiles  = _.flatten( [ testFiles, globalFiles, libFiles ] );

		// Wrap the Mocha execution in a watch wrapper...
		return this._executeAndWatch( () => {

			// The following code will be called once, at the start,
			// and then again each time the watch is triggered.
			return this.runMocha( {
				clearRequireCache: true
			} );

		}, {

			watchPaths   : watchFiles,
			watchOptions : {}

		}

		);

	}

}

module.exports = RunMochaWatch;

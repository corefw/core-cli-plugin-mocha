/**
 * @file
 * Defines the Core.cli.plugin.mocha.command.RunMocha class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @version 1.0
 * @copyright 2019 C2C Schools, LLC
 * @license MIT
 */

"use strict";

/**
 * Provides the 'test' command.
 *
 * @memberOf Core.cli.plugin.mocha.command
 * @extends Core.cli.plugin.mocha.command.BaseMochaCommand
 */
class RunMocha extends Core.cls( "Core.cli.plugin.mocha.command.BaseMochaCommand" ) {

	static get command() {
		return "test";
	}

	static get description() {
		return "Runs Mocha on the project detected at or above the current working directory.";
	}

	static get examples() {
		return [ "test" ];
	}

	static async addToCommander( cmd, outputHandler ) {
		cmd.option( "-d, --details", "Shows additional command information" );
	}

	async execute() {
		return this.runMocha( {} );
	}

}

module.exports = RunMocha;

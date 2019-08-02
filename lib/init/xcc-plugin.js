/**
 * @file
 * Adds the mocha commands.
 *
 * @author Luke Chavers <luke@c2cschools.com>
 * @since 6.0.0
 * @version 1.0
 * @copyright 2019 C2C Schools, LLC
 * @license MIT
 */

"use strict";

let xccPlugin = {

	name        : "Mocha",
	description	: "Provides project testing through Mocha and Chai.",

	async initDependencies( assetManager ) {

		// Register Dependencies
		assetManager.registerDependencies( {
			"mocha" : () => { return require( "mocha" ); 	},
			"chai"  : () => { return require( "chai" ); 	}
		} );

	},

	async initNamespaces( assetManager ) {

		// Register the plugin namespace.
		assetManager.registerNamespace(
			"Core.cli.plugin.mocha.",
			[ __dirname, ".." ]
		);

		// We'll also register `expect` (from `chai`) as a global,
		// so that it will be available to all Mocha tests.
		const CHAI = Core.dep( "chai" );
		global.expect = CHAI.expect;

	},

	async initServices( ioc, spawn ) {

		// Init the mocha wrapper
		ioc.singleton( "mochaWrapper", function() {
			return spawn( "Core.cli.plugin.mocha.MochaWrapper", {} );
		} );

	},

	async initCommands( commandLoader ) {

		return commandLoader.addCommands(
			this,
			"Core.cli.plugin.mocha.command.RunMocha",
			"Core.cli.plugin.mocha.command.RunMochaWatch"
		);

	}

};

module.exports = xccPlugin;

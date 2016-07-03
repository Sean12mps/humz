console.log( 'main.js' );

var commands = require( './modules/ext-commands.js' );

chrome.runtime.onMessage.addListener(

	function( response, sender, sendResponse ) {

		if ( typeof( response.command ) == 'undefined' ) return false;

		commands.execute( response.command, response );

	}
	
);
/* testing sending message back and forth */
var $ = require( 'jquery' ),
	template = require( './ext-template' );


function open_extension() {

	chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) {

		var message = {
			command: 'get_element_a',
		};

		chrome.tabs.sendMessage( tabs[0].id, message );

	} );

};


function get_element_a( args ) {
	
	var a = $( 'body a' );

	chrome.runtime.sendMessage( { command : 'get_wrapper' } );

};


function get_wrapper() {

	var message = {
		command: 'append_template',
		temp : template.get('window_search')
	};

	chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) {

		chrome.tabs.sendMessage( tabs[0].id, message );

	} );

};


function append_template( response ) {

	var temp = template.compile( response.temp );

	$( 'body' ).prepend( temp );

};


function execute( command, args ) {

	switch ( command ) {

		case 'open_extension':
			open_extension( args );
			break;

		case 'get_element_a':
			get_element_a( args );
			break;
		
		case 'get_wrapper':
			get_wrapper();
			break;
		
		case 'append_template':
			append_template( args );
			break;

	}

};


exports.execute = execute;
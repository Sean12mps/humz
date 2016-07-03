// requirements
var $ = require( 'jquery' );

// functions
function get( name ){

	if ( typeof( mytemplate[name] ) == 'undefined' ) return false;

	return mytemplate[name];

};

function compile( str ) {

	return ( $( str ) );

};


// dist
exports.get = get;

exports.compile = compile;
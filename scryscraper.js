/* Scryfall web scraper script */


var getHTML = function ( url, callback ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	// Get the HTML
	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();

};

getHTML( 'https://scryfall.com/@steve/decks/1de810f5-f318-43a7-808d-be16362a2c45', function (response) {
	var test = document.querySelector( '#test' );
	var other = response.querySelector( '.deck-list' );
	test.innerHTML = other.innerHTML;
});

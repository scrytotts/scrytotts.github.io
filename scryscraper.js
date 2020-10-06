/* json morpher script */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if ( urlParams.has('json-data') ) {
    var data = urlParams.get('json-data');
    var obj = JSON.parse(data);
    console.log(obj);
}

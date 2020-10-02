/* json morpher script */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('json-data')) {
    console.log('success');
}

/* json morpher script */
function convert() { 
  var inputBox = document.getElementById('input');
  var input = inputBox.value;
  console.log("Input: " + input);
  
  var outputBox = document.getElementById('output');
  var output = "";
  
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.innerHTML = "";
  
  try {
    if(!isJSON(input)) throw "Not JSON, try again.";
    output = convertJSON(input);
    outputBox.innerHTML = output;
  }
  catch(e) {
    errorMessage.innerHTML = e;
  }

function isJSON(str) {
  try {
    JSON.parse(str);
  }
  catch(e) {
    return false;
  }
  return true;
}

function convertJSON(str) {
  var tabletopJSON = "test";
  var scryJSON = JSON.parse(str);
  console.log("Parse me daddy!");
  
  return tabletopJSON;
}

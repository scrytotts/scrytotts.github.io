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
    convertJSON(input);
  }
  catch(e) {
    errorMessage.innerHTML = e;
  }
  
  //var inputJSON = JSON.parse(input);
  
  //console.log(inputJSON);
  
  //textbox.innerHTML = "TEST"
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
  var scryJSON = JSON.parse(str);
  console.log("Parse me daddy!");
}

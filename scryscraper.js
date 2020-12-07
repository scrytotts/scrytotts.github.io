/* json morpher script */
function convert() { 
  var inputBox = document.getElementById('input');
  var input = inputBox.innerText;
  console.log("Input: " + input);
  
  var outputBox = document.getElementById('output');
  var output = "";
  
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.innerHTML = "";
  
  try {
    if(!isJSON(input)) throw "Not JSON, try again.";
    console.log("converting json, beep boop!");
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

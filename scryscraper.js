/* json morpher script */
function convert() { 
  var textbox = document.getElementById('data');
  
  var input = textbox.innerText;
  
  var inputJSON = JSON.parse(input);
  
  console.log(inputJSON);
  
  //textbox.innerHTML = "TEST"
}

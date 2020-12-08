/* json morpher script */
function convert() { 
  var inputBox = document.getElementById('input');
  var input = inputBox.value;
  //console.log("Input: " + input);
  
  var outputBox = document.getElementById('output');
  var output = "";
  
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.innerHTML = "";
  
  try {
    if(!isJSON(input)) throw "Not JSON, try again.";
    output = convertJSON(input);
    outputBox.value = output;
  }
  catch(e) {
    errorMessage.innerHTML = e;
  }
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
  var tabletopJSON = "";
  var scryJSON = JSON.parse(str);
  
  var stacks = {ObjectStates: []};
  
  stacks.commanders = scryStripper(scryJSON,"commanders");
  
  tabletopJSON = JSON.stringify(stacks);
  
  return tabletopJSON;
}

function scryStripper(obj, section) {
  var sectionData = []
  
  var cardArray = obj.entries[section]
  
  var i;
  for (i = 0, i < cardArray.length, i++) {
    sectionData[i] = {count: cardArray[i].count, name: cardArray[i].card_digest.name, image: cardArray[i].card_digest.image}
  }
  return sectionData;
}

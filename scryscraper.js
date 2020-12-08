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
  
  var deck = {ObjectStates: []};
  
  var stacks = deck.ObjectStates;
  
  stacks[0] = scryStripper(scryJSON, "commanders");
  
  var nonlands = scryStripper(scryJSON, "nonlands");
  var lands = scryStripper(scryJSON, "lands");
  stacks[1] = nonlands.concat(lands);
  
  stacks[2] = scryStripper(scryJSON, "outside");
  
  tabletopJSON = JSON.stringify(deck);
  
  return tabletopJSON;
}

function scryStripper(obj, section) {
  var sectionData = []
  
  var cardArray = obj.entries[section]
  
  var i;
  for (i = 0; i < cardArray.length; i++) {
    sectionData[i] = {count: cardArray[i].count, name: cardArray[i].card_digest.name, image: cardArray[i].card_digest.image}
  }
  return sectionData;
}

function transformObj(position, flippedUp = false) {
  var rotDelta = 0;
  if (flippedUp == true) {
    rotDelta = 180;
  }
  
  var transform = {
    posX: position*3,
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 180 - rotDelta,
    rotZ: 180,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1
  };
  
  return transform;
}

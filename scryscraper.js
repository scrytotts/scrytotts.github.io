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
  
  var commanders = scryStripper(scryJSON, "commanders");
  if (commanders.length > 1) {
    stacks[0] = stack(commanders, 0, true);
  }
  else if (commanders.length == 1) {
    stacks[0] = soloStack(commanders, 0, true);
  }
  
  var nonlands = scryStripper(scryJSON, "nonlands");
  var lands = scryStripper(scryJSON, "lands");
  var ninenine = nonlands.concat(lands);
  if (ninenine.length > 1) {
    stacks[1] = stack(ninenine, 1);
  }
  else if (ninenine.length == 1) {
    stacks[1] = soloStack(ninenine, 1);
  }
  
  var outside = scryStripper(scryJSON, "outside");
  if (outside.length > 1) {
    stacks[2] = stack(outside, 2);
  }
  else if (outside.length == 1) {
    stacks[2] = soloStack(outside, 2);
  }
  
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

function transformObj(position = 0, flippedUp = false) {
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

function containedObjects(cardArray) {
  var containedObjs = [];
  var i;
  for(i=0; i < cardArray.length; i++) {
    var obj = { CardID: i+1, Name: "Card", Nickname: cardArray[i].name, Transform: transformObj() };
    containedObjs[i] = obj;
  }
  return containedObjs;
}

function deckIDs(cardArray) {
  var IDs = [];
  var i,j;
  for(i=0; i < cardArray.length; i++) {
    for(j=0; j < cardArray[i].count; j++) {
      IDs[i] = i+1;
    }
  }
  return IDs;
}

function customDeck(cardArray) {
  var cstmDeck = {};
  var i;
  for(i=0; i < cardArray.length; i++) {
    cstmDeck[i+1] = { FaceURL: cardArray[i].image, BackURL: "https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1562196887", NumHeight: 1, NumWidth: 1, BackIsHidden: true }
  }
  return cstmDeck;
}
  
function stack(cardArray, position, flipped = false) {
  var stack = { Name: "DeckCustom", ContainedObjects: containedObjects(cardArray), DeckIDs: deckIDs(cardArray), CustomDeck: customDeck(cardArray), Transform: transformObj(position, flipped) };
  return stack;
}

function soloStack(cardArray, position, flipped) {
  var solostack = { Name: "Card", CardID: 1, CustomDeck: cardArray[0].image, Transform: transformObj(position, flipped), Nickname: cardArray[0].name };
  return solostack;
}
  
  

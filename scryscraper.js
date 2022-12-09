/* json morpher script */
function convert() { 
  var inputBox = document.getElementById('input');
  var input = inputBox.value;
  
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
  
  var position = 0;
  
  var nonlands = scryStripper(scryJSON, "nonlands");
  var lands = scryStripper(scryJSON, "lands");
  var ninenine = nonlands.concat(lands);
  if (ninenine.length > 1) {
    stacks.push(stack(ninenine, position));
    position++;
  }
  else if (ninenine.length == 1) {
    stacks.push(soloStack(ninenine, position));
    position++;
  }
  
  var commanders = scryStripper(scryJSON, "commanders");
  if (commanders.length > 1) {
    stacks.push(stack(commanders, position, true, true));
    position++;
  }
  else if (commanders.length == 1) {
    stacks.push(soloStack(commanders, position, true, true));
    position++;
  }
  
  var outside = scryStripper(scryJSON, "outside");
  if (outside.length > 1) {
    stacks.push(stack(outside, position, true, true));
    position++;
  }
  else if (outside.length == 1) {
    stacks.push(soloStack(outside, position, true, true));
    position++;
  }
  
  var dfcNonlands = scryStripper(scryJSON, "nonlands", true);
  var dfcLands = scryStripper(scryJSON, "lands", true);
  var dfc = dfcNonlands.concat(dfcLands);
  if (dfc.length > 1) {
    stacks.push(stack(dfc, position, true, true));
    position++;
  }
  else if (dfc.length == 1) {
    stacks.push(soloStack(dfc, position, true, true));
    position++;
  }
  
  tabletopJSON = JSON.stringify(deck);
  
  return tabletopJSON;
}

function scryStripper(obj, section, dfcOnly = false) {
  var sectionData = []
  
  var cardArray = obj.entries[section]
  
  if (dfcOnly == true) {
    var i;
    for (i = 0; i < cardArray.length; i++) {
      var digest = cardArray[i].card_digest;
      if (digest != null) {
        if (digest['name'].includes("//")) {
          sectionData.push({count: cardArray[i].count, name: digest.name, image: digest.image_uris.front});
        }
      }
    }
  }
  else {
    var i;
    for (i = 0; i < cardArray.length; i++) {
      var digest = cardArray[i].card_digest;
      if (digest != null) {
        sectionData.push({count: cardArray[i].count, name: digest.name, image: digest.image_uris.front});
      }
    }
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
    rotY: 180,
    rotZ: 180 - rotDelta,
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
    for(j=0; j < cardArray[i].count; j++) {
      var obj = { CardID: (1+i)*100, Name: "Card", Nickname: cardArray[i].name, Transform: transformObj() };
      containedObjs.push(obj);
    }
  }
  return containedObjs;
}

function deckIDs(cardArray) {
  var IDs = [];
  var i,j;
  for(i=0; i < cardArray.length; i++) {
    for(j=0; j < cardArray[i].count; j++) {
      IDs.push((1+i)*100);
    }
  }
  return IDs;
}

function customDeck(cardArray, backAllowed = false) {
  var cstmDeck = {};
  var defaultBack = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg";
  var i;
  for(i=0; i < cardArray.length; i++) {
    var back = defaultBack;
    var hidden = true;
    var name = cardArray[i].name
    if(backAllowed == true && name.includes("//")) {
      var front = cardArray[i].image;
      back = front.replace("front", "back");
      hidden = false;
    }
    cstmDeck[i+1] = { FaceURL: cardArray[i].image, BackURL: back, NumHeight: 1, NumWidth: 1, BackIsHidden: hidden }
  }
  return cstmDeck;
}
  
function stack(cardArray, position, backAllowed = false, flipped = false) {
  var stack = { Name: "DeckCustom", ContainedObjects: containedObjects(cardArray), DeckIDs: deckIDs(cardArray), CustomDeck: customDeck(cardArray, backAllowed), Transform: transformObj(position, flipped) };
  return stack;
}

function soloStack(cardArray, position, backAllowed = false, flipped = false) {
  var solostack = { Name: "Card", CardID: 100, CustomDeck: customDeck(cardArray, backAllowed), Transform: transformObj(position, flipped), Nickname: cardArray[0].name };
  return solostack;
}
  
function downloadToFile() {
  var outputbox = document.getElementById('output');
  var output = outputbox.value;
  var filename = "output.json"
  var contentType = "application/json";
  var a = document.createElement('a');
  var file = new Blob([output], {type: contentType});
  
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(a.href);
}

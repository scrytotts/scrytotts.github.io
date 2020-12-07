from lxml import html
import requests
from sys import argv
import json

# get arguments from console and save to list
args = argv[1:]

#check if arguments were passed in
if args:

	# Defined variables
	#commanderXPath = '//div[@class="deck-list-section"][1]//span[@class="deck-list-entry-name"]/a/text()'
	commanderXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Commander")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'
	#ninetynineXPath = '//div[@class="deck-list-section"][position()>1 and position()<last()]//span[@class="deck-list-entry-name"]/a/text()'
	#ninetyninecountXPath = '//div[@class="deck-list-section"][position()>1 and position()<last()]//span[@class="deck-list-entry-count"]/a/text()'
	creaturesXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Creatures")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'
	planeswalkersXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Planeswalkers")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'
	artifactsXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Artifacts")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'
	enchantmentsXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Enchantments")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'
	instantsXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Instants")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'
	sorceriesXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Sorceries")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'
	landsXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Lands")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'

	creaturesCountXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Creatures")]/following-sibling::ul//span[@class="deck-list-entry-count"]/a/text()'
	planeswalkersCountXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Planeswalkers")]/following-sibling::ul//span[@class="deck-list-entry-count"]/a/text()'
	artifactsCountXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Artifacts")]/following-sibling::ul//span[@class="deck-list-entry-count"]/a/text()'
	enchantmentsCountXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Enchantments")]/following-sibling::ul//span[@class="deck-list-entry-count"]/a/text()'
	instantsCountXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Instants")]/following-sibling::ul//span[@class="deck-list-entry-count"]/a/text()'
	sorceriesCountXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Sorceries")]/following-sibling::ul//span[@class="deck-list-entry-count"]/a/text()'
	landsCountXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Lands")]/following-sibling::ul//span[@class="deck-list-entry-count"]/a/text()'


	#outsideXPath = '//div[@class="deck-list-section"][last()]//span[@class="deck-list-entry-name"]/a/text()'
	outsideXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Outside The Game")]/following-sibling::ul//span[@class="deck-list-entry-name"]/a/text()'

	#commanderImgXPath = '//div[@class="deck-list-section"][1]//li[@class="deck-list-entry"]/@data-card-image'
	commanderImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Commander")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'
	#ninetynineImgXPath = '//div[@class="deck-list-section"][position()>1 and position()<last()]//li[@class="deck-list-entry"]/@data-card-image'
	creaturesImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Creatures")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'
	planeswalkersImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Planeswalkers")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'
	artifactsImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Artifacts")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'
	enchantmentsImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Enchantments")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'
	instantsImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Instants")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'
	sorceriesImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Sorceries")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'
	landsImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Lands")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'

	outsideImageXPath = '//h6[@class="deck-list-section-title"][contains(text(),"Outside The Game")]/following-sibling::ul//li[@class="deck-list-entry"]/@data-card-image'

	allHREFS = '//span[@class="deck-list-entry-name"]/a/@href'
	allNAMES = '//span[@class="deck-list-entry-name"]/a/text()'

	cardFront = '//div[@class="card-image-front"]/img/@src'
	cardBack = '//div[@class="card-image-back"]/img/@src'

	#backPath = 'https://www.frogtown.me/images/gatherer/CardBack.jpg'
	#backPath = 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg'
	backPath = 'https://musingsofalifelongnerd.files.wordpress.com/2015/01/mtg-card-back.jpg'

	#assign first argument(URL) to local variable
	deckURL = args[0]

	#get page data from supplied url
	page = requests.get(deckURL)
	#save page data into tree list
	tree = html.fromstring(page.content)

	# FUNCTION: get a list from a dom tree given a xpath
	def getListFromXPath(xpath_,tree_,convertToInt=False):
		list = tree_.xpath(xpath_)
		list = [item.strip() for item in list]

		for item in list:
			if item == '':
				list.remove(item)

		if convertToInt:
			for index in range(0, len(list)):
				list[index] = int(list[index])

		return list

	def getListLength(xpath_,tree_):
		list = tree_.xpath(xpath_)
		list = [item.strip() for item in list]

		for item in list:
			if item == '':
				list.remove(item)

		return len(list)

	def getURLname(list_):
		names = []
		for item in list_:
			names.append(item.rsplit('/',1)[-1])

		return names

	# FUCTION: return dictionary that represents the transform at a given x position
	def getTransformDictionaryAtX(x_=0):
		return dict(posX=x_, posY=0, posZ=0, rotX=0, rotY=180, rotZ=180, scaleX=1, scaleY=1, scaleZ=1)

	# FUNCTION: return a 'ContainedObject' dictionary
	def getContainedObjectDictionary(list_):
		objectList = []
		for index, name in enumerate(list_, start=1):
			cardObject = dict(CardID=index*100, Name="Card", Nickname=name, Transform=getTransformDictionaryAtX())
			objectList.append(cardObject)

		return objectList

	# FUNCTION: return a 'ContainedObject' dictionary with a count
	def getContainedObjectDictionaryWithCount(list_,count_):
		objectList = []
		for index, name in enumerate(list_, start=1):
			cardObject = dict(CardID=index*100, Name="Card", Nickname=name, Transform=getTransformDictionaryAtX())
			objectList.append(cardObject)
			if count_[index-1] > 1:
				for number in range(2, count_[index-1]+1):
					objectList.append(cardObject)

		return objectList

	# FUNCTION: return a List of IDs
	def getIDList(list_):
		idList = []

		for index in range(1, len(list_)+1):
			idList.append(index*100)

		return idList

	# FUNCTION: return a List of IDs
	def getIDListWithCount(list_, count_):
		idList = []

		for index in range(1, len(list_)+1):
			idList.append(index*100)
			if count_[index-1] > 1:
				for number in range(2, count_[index-1]+1):
					idList.append(index*100)

		return idList

	# FUNCTION: build a custom deckURL
	def getCustomDeck(imagePaths_):
		customDeck = {}

		for index, path in enumerate(imagePaths_, start=1):
			customDeck[str(index)] = dict(FaceURL=path, BackURL=backPath, NumHeight=1, NumWidth=1, BackIsHidden=True)

		return customDeck

	def getFlippedCustomDeck(frontPaths_, backPaths_):
		customDeck = {}

		for index, path in enumerate(frontPaths_, start=1):
			customDeck[str(index)] = dict(FaceURL=path, BackURL=backPaths_[index-1], NumHeight=1, NumWidth=1, BackIsHidden=False)

		return customDeck

	def getStack(listXPath_, imagePaths_, tree_, x_):
		list = getListFromXPath(listXPath_, tree_)
		imagePaths = getListFromXPath(imagePaths_, tree_)
		containedObject = getContainedObjectDictionary(list)
		idList = getIDList(list)
		customDeck = getCustomDeck(imagePaths)
		stack = dict(Name="DeckCustom", ContainedObjects=containedObject, DeckIDs=idList, CustomDeck=customDeck, Transform=getTransformDictionaryAtX(x_))

		return stack

	def getMultiStackWithCount(multiList_, multiCount_, multiImage_, tree_, x_):
		list = []
		for item in multiList_:
			list.extend(getListFromXPath(item, tree_))

		#list = getListFromXPath(listXPath_, tree_)

		count = []
		for item in multiCount_:
			count.extend(getListFromXPath(item, tree_, True))
		#count = getListFromXPath(countXPath_, tree_, True)

		imageURLS = []
		for item in multiImage_:
			imageURLS.extend(getListFromXPath(item, tree_))
		#imagePaths = getListFromXPath(imagePaths_, tree_)
		containedObject = getContainedObjectDictionaryWithCount(list, count)
		idList = getIDListWithCount(list, count)
		customDeck = getCustomDeck(imageURLS)
		stack = dict(Name="DeckCustom", ContainedObjects=containedObject, DeckIDs=idList, CustomDeck=customDeck, Transform=getTransformDictionaryAtX(x_))

		return stack

	def getSingleCardStack(cardXPath_, imageXPath_, tree_, x_):
		card = getListFromXPath(cardXPath_, tree_)
		imagePath = getListFromXPath(imageXPath_, tree_)
		customDeck = getCustomDeck(imagePath)
		stack = dict(Name="Card", CardID=100, CustomDeck=customDeck, Transform=getTransformDictionaryAtX(x_), Nickname=card[0])

		return stack

	def getFlipCardStack(hrefs_, names_, frontPath_, backPath_, tree_, x_):
		hrefs = getListFromXPath(hrefs_, tree_)
		urlNames = getURLname(hrefs)
		names = getListFromXPath(names_, tree_)

		flippedNames = []
		flippedFronts = []
		flippedBacks = []

		if len(urlNames) == len(names):
			for index in range(len(names)):
				if len(urlNames[index]) > len(names[index]):
					flippedNames.append(names[index])
					flipPage = requests.get(hrefs[index])
					flipTree = html.fromstring(flipPage.content)
					front = getListFromXPath(frontPath_, flipTree)
					flippedFronts.append(front[0])
					back = getListFromXPath(backPath_, flipTree)
					flippedBacks.append(back[0])

		containedObject=getContainedObjectDictionary(flippedNames)
		idList = getIDList(flippedNames)
		customDeck = getFlippedCustomDeck(flippedFronts, flippedBacks)

		stack = []

		count = len(flippedNames)

		if count > 1:
			stack = dict(Name="DeckCustom", ContainedObjects=containedObject, DeckIDs=idList, CustomDeck=customDeck, Transform=getTransformDictionaryAtX(x_))
		elif count == 1:
			stack = dict(Name="Card", CardID=100, CustomDeck=customDeck, Transform=getTransformDictionaryAtX(x_), Nickname=flippedNames[0])

		return stack, count

	def getStackList(ninetyNinePaths_, ninetyNineCounts_, ninetyNineImages_, commanderList_, commanderImage_, outsideList_, outsideImages_, allHREFS_, allNames_, frontPath_, backPath_, tree_):
		stackList = []
		#build the 99
		stackList.append(getMultiStackWithCount(ninetyNinePaths_, ninetyNineCounts_, ninetyNineImages_,tree_,0))
		#build the commander
		commanderLength = getListLength(commanderList_, tree_)

		if  commanderLength > 1:
			stackList.append(getStack(commanderList_, commanderImage_, tree_, 2.2))
		elif commanderLength == 1:
			stackList.append(getSingleCardStack(commanderList_, commanderImage_, tree_, 2.2))

		#build the outside stuff
		outsideLength = getListLength(outsideList_, tree_)

		if outsideLength > 1:
			stackList.append(getStack(outsideList_, outsideImages_, tree_, 4.4))
		elif outsideLength == 1:
			stackList.append(getSingleCardStack(outsideList_, outsideImages_, tree_, 4.4))

		#add flipped card stackList
		flipstack, flipcount = getFlipCardStack(allHREFS_, allNames_, frontPath_, backPath_, tree_, 6.6)

		if flipcount > 0:
			stackList.append(flipstack)

		return stackList

	# create dictionary to hold list
	deckGroup = dict(ObjectStates=getStackList([creaturesXPath, planeswalkersXPath, artifactsXPath, enchantmentsXPath, instantsXPath, sorceriesXPath, landsXPath], [creaturesCountXPath, planeswalkersCountXPath, artifactsCountXPath, enchantmentsCountXPath, instantsCountXPath, sorceriesCountXPath, landsCountXPath], [creaturesImageXPath, planeswalkersImageXPath, artifactsImageXPath, enchantmentsImageXPath, instantsImageXPath, sorceriesImageXPath, landsImageXPath], commanderXPath, commanderImageXPath, outsideXPath, outsideImageXPath, allHREFS, allNAMES, cardFront, cardBack, tree))

	with open('output.json', 'w') as outfile:
		json.dump(deckGroup, outfile)

	print('Success!')

else:
	print('Please give a scryfall decklist url as the first argument')

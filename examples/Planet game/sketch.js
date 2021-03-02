p5.disableFriendlyErrors = true;

function preload() {
  universeBackground = loadImage("assets/space.png")
  mercuryImg = loadImage("assets/mercury.png")
  venusImg = loadImage("assets/venus.png")
  earthImg = loadImage("assets/earth.png")
  moonImg = loadImage("assets/moon.png")
  marsImg = loadImage("assets/mars.png")
  jupiterImg = loadImage("assets/jupiter.png")
  saturnImg = loadImage("assets/saturn.png")
  uranusImg = loadImage("assets/uranus.png")
  neptuneImg = loadImage("assets/neptune.png")
  pointerImg = loadImage("assets/pointer.png")
}

function setup() {
  pointerImg.resize(11, 17)


  venusImg.resize(100, 100)
  earthImg.resize(100, 100)
  moonImg.resize(100, 100)
  marsImg.resize(100, 100)
  jupiterImg.resize(100, 100)
  saturnImg.resize(200, 96)
  uranusImg.resize(100, 100)
  neptuneImg.resize(100, 100)
  mercuryImg.resize(100, 100)





  createCanvas(windowWidth, windowHeight);

  jupiter = createsprite(jupiterImg, windowWidth / 2, windowHeight / 5, 1, "planets")
  saturn = createsprite(saturnImg, windowWidth / 2, windowHeight / 1.3, 1, "planets")
  uranus = createsprite(uranusImg, windowWidth / 3, windowHeight / 6, 1, "planets")
  neptune = createsprite(neptuneImg, windowWidth / 6, windowHeight / 5, 1, "planets")
  earth = createsprite(earthImg, windowWidth / 2, windowHeight / 2, 1, "planets")
  venus = createsprite(venusImg, windowWidth / 4, windowHeight / 1.5, 1, "planets")
  mars = createsprite(marsImg, windowWidth / 5, windowHeight / 2, 1, "planets")
  mercury = createsprite(mercuryImg, windowWidth / 3, windowHeight / 3, 1, "planets")
  moon = createsprite(moonImg, windowWidth / 1.5, windowHeight / 2.5, 1, "planets")
  pointer = createsprite(pointerImg, mouseX, mouseY, 0, "pointer")

  orderSprites("planets")
}

function orderSprites(tag) {
  count = 0
  for (let i = 0; i < spritesarray.length; i++) {
    if (spritesarray[i].stag.includes(tag)) {
      spritesarray[i].stag.push(count)
      count += 1
    }
  }
}

function fillListSprites(length) {
  planetList = []
  pushSprite = true
  while (planetList.length < length) {
    sprite = searchrandomtag("planets")
    pushSprite = true
    for (let i = 0; i < planetList.length; i++) {
      if (planetList[i] == sprite) {
        pushSprite = false
      }
    }
    if (pushSprite == true) {
      planetList.push(sprite)
    }
  }
  return planetList
}

function sortPlanetList(planetList) {
  planetList.sort(function(a, b) {
    if (a.stag[1] > b.stag[1]) return 1
    else if (a.stag[1] < b.stag[1]) return -1
  })
  return (planetList)
}


function generateAllPlanets() {
  id = (searchrandomtag("planets"))
  sprite = searchid(id)
  fillListSprites()
}

function fillListPositions(length) {
  positionList = []
  radius = 25
  overlapping = false

  while (positionList.length < length) {
    var position = {
      x: random(100, windowWidth - 100),
      y: random(100, windowHeight - 100),
      r: (75)
    }
    overlapping = false

    for (i = 0; i < positionList.length; i++) {
      var other = positionList[i];
      var distance = dist(position.x, position.y, other.x, other.y);
      if (distance < position.r + other.r) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      positionList.push(position)
    }
  }
  return positionList
}

function applyPositions(planetList, positionList) {
  for (i = 0; i < planetList.length; i++) {
    movespriteabsolute(planetList[i], positionList[i].x, positionList[i].y)
  }
}

function mouseClicked() {
  clicked = true
}

start = true
gameCount = 0

function draw() {
  imageMode(CENTER);
  image(universeBackground, windowWidth / 2, windowHeight / 2);
  noCursor()
  movespriteabsolute(pointer, mouseX, mouseY)
  textSize(32);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);

  if (gameCount < 4) length = 2
  else if (gameCount < 7) length = 3
  else if (gameCount < 10) length = 4
  else if (gameCount < 15) length = 5

  if (start == true) {
    gameCount += 1
    planetList = fillListSprites(length)
    planetList = sortPlanetList(planetList)
    positionList = fillListPositions(length)
    applyPositions(planetList, positionList)
    target = planetList[0]
    start = false
  }

  drawspriteslist(planetList)

  if (collide(pointer, target) && clicked === true) {
    start = true
  }

  clicked = false
  drawspritestag("pointer")
}
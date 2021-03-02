var spritesarray = [];
var spriteid = 0;

//creates a sprite object and adds it to the sprite list
function createsprite(img, x, y, layer, tag) {
    var sprite = {
        img: img,
        xpos: x,
        ypos: y,
        height: img.height,
        width: img.width,
        id: spriteid,
        clayer: layer,
        stag: [tag]
    };

    spriteid++;
    spritesarray.push(sprite)
    
    if(alreadyexists(sprite) == false){
        spriteid++;
        spritesarray.push(sprite)
    }
    
    return sprite;

}

//creates a shape and adds it to the sprites list
function createshape(shape, height, width, x, y){
    var shape = {
        isshape: true,
        shape: shape,
        height: height,
        width: width,
        xpos: x,
        ypos: y,
        color: color(random(255),random(255),random(255)),
    }
    spritesarray.push(shape)
    return shape
}

//checks if a sprite is in the sprite list
function alreadyexists(spritecheck){
    for (let i = 0; i < spritesarray.length; i++) {
        if((spritesarray[i].img == spritecheck.img)&& (spritesarray[i].xpos == spritecheck.xpos) && (spritesarray[i].ypos == spritecheck.ypos)){
            return true
        }
    }
    return false;
}

//draws sprites
function drawsprites() {
    for (let i = 0; i < spritesarray.length; i++) {
        if(spritesarray[i].isshape == true){
            fill(spritesarray[i].color) 
            switch(spritesarray[i].shape){
                case "rect" || "rectangle":
                    rect(spritesarray[i].xpos, spritesarray[i].ypos, spritesarray[i].width, spritesarray[i].height)
                    break;
                case "circle" || "ellipse":
                    ellipse(spritesarray[i].xpos, spritesarray[i].ypos, spritesarray[i].width, spritesarray[i].height)
                    break;

            }   
        }
        else{
            image(spritesarray[i].img, spritesarray[i].xpos, spritesarray[i].ypos)
        }
    }
}

//draws sprites from a list
function drawspriteslist(list){
  if (list.isArray===false){
    print("p5create error - argument is not a list")
  }
  for (let i = 0; i < list.length; i++) {
    image(list[i].img, list[i].xpos, list[i].ypos)
  }
}

//draws sprites from a tag
function drawspritestag(tag){
  for (let i = 0; i < spritesarray.length; i++) {
    if (spritesarray[i].stag.includes(tag)){
      image(spritesarray[i].img, spritesarray[i].xpos, spritesarray[i].ypos)
    }
  }
}

//add a tag to a sprite
function addtag(sprite, tag){
  sprite.stag.push(tag)
}

//remove a tag from a sprite
function removetag(sprite, tag){
  index = sprite.stag.findIndex((element) => element == tag)
  if(index !== -1){
    sprite.stag.splice(index, 1)
  }
}

//allows you to set a save value in the game
function setsave(name, value) {
    document.cookie = name + "=" + value + ";";
}

//allows you to grab a pre-existing save
function getsave(cname) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        var cookiesplit = c.split("=")
        if (cookiesplit[0] == cname || cookiesplit[0] == " " + cname) {
            return (cookiesplit[1])
        }
    }
    return "";
}

//removes a sprite
function removeobject(sprite) {
    spriteidentifier = sprite.id;
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].id == spriteidentifier) {
            spritesarray.splice(i,1)

            break;
        }

    }
}

//removes a group of sprites
function removebytag(tag) {
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].stag == tag) {
            spritesarray.splice(i,1)
        }
    }
}

//searches for a tag - fill in the blank section
function addCountTag(tag) {
    for (let i = 0; i < spritesarray.length; i++) {
      
    }
}

//searches for an id
function searchid(id) {
    for (let i = 0; i < spritesarray.length; i++) {
      if (spritesarray[i].id == id){
        return spritesarray[i]
      }
    }
}

//outputs a random sprite from a list
function searchrandomlist(list){
    randomnumber = Math.floor(random(0, list.length-1))
  for (let i = 0; i < list.length; i++){
    if (i == randomnumber) {
      return searchid(list[i])
    }
  }
}

//searches for a random sprite with a tag and returns its id
function searchrandomtag(tag) {
  list = []
  for (let i = 0; i < spritesarray.length; i++) {
    if (spritesarray[i].stag.includes(tag)){
      list.push(spritesarray[i].id)
    }
  }
  randomnumber = Math.floor(random(0, list.length-1))
  for (let i = 0; i < list.length; i++){
    if (i == randomnumber) {
        return searchid(list[i])
    }
  }
}

//moves 1 sprite absolutely
function movespriteabsolute(sprite, x, y){
    sprite.xpos = x;
    sprite.ypos = y;
}

//moves 1 sprite relatively
function movespriterelative(sprite, xory, movement){
  if (xory == "x") {
    sprite.xpos += movement;
  }
  else if (xory == "y") {
    sprite.ypos += movement;
  }
}

//allows you to move all sprites in a group
function movebytag(tag, xory, movement) {
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].stag == tag) {
            if (xory == "x") {
                spritesarray[i].xpos += movement;
            }
            else if (xory == "y") {
                spritesarray[i].ypos += movement;
            }
        }
    }
}

//checks for collisions
function collide(sprite, collidesprite) {
    if (((sprite.ypos + sprite.height) > collidesprite.ypos) && ((sprite.xpos + sprite.width) > collidesprite.xpos) && !((sprite.xpos) > collidesprite.xpos + collidesprite.width) && !((sprite.ypos) > collidesprite.ypos + collidesprite.height)) {
        return true;
    }
    else {
        return false;
    }
}

//checks for collisions with a group
function collidewithtag(sprite, tag) {
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].stag == tag) {
            if (((sprite.ypos + sprite.img.height) > spritesarray[i].ypos) && ((sprite.xpos + sprite.img.width) > spritesarray[i].xpos) && !((sprite.xpos) > spritesarray[i].xpos + spritesarray[i].img.width) && !((sprite.ypos) > spritesarray[i].ypos + spritesarray[i].img.height)) {
                
                return true;
            }
        }
    }
    return false;
}

//checks if a sprite is off screen
function ifoffscreen(sprite) {

    if ((sprite.xpos + sprite.width < 0 || sprite.xpos > width || sprite.ypos > height || sprite.ypos + sprite.width < 0)) {
        return true;
    }
}

//creates a button
function createbutton(color,hovercolor,width, height, x, y, clickaction, hovertext){
    
    if(mouseIsPressed && (((y + height) > mouseY) && ((x + width) > mouseX) && !((x) > mouseX) && !((y) > mouseY))){
        eval(clickaction)
    }
    noStroke();
    if((((y + height) > mouseY) && ((x + width) > mouseX) && !((x) > mouseX) && !((y) > mouseY))){
        fill(hovercolor);
        textSize(28)
        text(hovertext, x + height, y)
    }
    else{
        fill(color);
    }
    
    rect(x, y, width, height);
    fill(0,0,0);
}

//creates a blank button
function createblankbutton(sprite, clickaction){
    y = sprite.ypos;
    x = sprite.xpos;
    height = sprite.img.height
    width = sprite.img.width

    if(mouseIsPressed && (((y + height) > mouseY) && ((x + width) > mouseX) && !((x) > mouseX) && !((y) > mouseY))){
        eval(clickaction)
    }


    fill(0,0,0);
}

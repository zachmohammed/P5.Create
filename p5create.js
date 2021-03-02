
var spritesarray = [];
var animations =[];
var spriteid = 0;
function createsprite(img, x, y,layer, tag) {
    var sprite = {
        img: img,
        xpos: x,
        ypos: y,
        height: img.height,
        width: img.width,
        id: spriteid,
        clayer: layer,
        stag: [tag],
        visible: true
    };
    

    spriteid++;
    spritesarray.push(sprite)
    
    if(alreadyexists(sprite) == false){
        spriteid++;
        spritesarray.push(sprite)
    }
    
    return sprite;

}
function createanimation(sprite, spritepath, ext ,numberofsprites, timestamp, state){
    framesarray = []
    for(let i = 0; i < numberofsprites; i++){
        spritetoadd = loadImage(spritepath + (i + 1) + ext)
        framesarray.push(spritetoadd)
    }
    var animation = {
        sprite: sprite,
        numberofsprites: numberofsprites,
        timestamp: timestamp,
        frames: framesarray,
        currentframe: 1,
        timecount: 0,
        state: state
    }
    animations.push(animation)
    return animation
}
function changeframes(spritepath, ext,numberofsprites){
    framesarray = []
    for(let i = 0; i < numberofsprites; i++){
        spritetoadd = loadImage(spritepath + (i + 1) + ext)
        framesarray.push(spritetoadd)
    }
    return framesarray
}
function drawanimations(){
    for(let i = 0; i < animations.length; i++){    
        animations[i].timecount++
        if(animations[i].timecount > animations[i].timestamp){
            
            animations[i].sprite.img = animations[i].frames[animations[i].currentframe - 1]
            animations[i].timecount = 0
            animations[i].currentframe++
        }
        if(animations[i].currentframe > animations[i].numberofsprites){
            animations[i].currentframe = 1
        }
    }
}


function createshape(shape, height, width, x, y, tag){
    var shape = {
        isshape: true,
        shape: shape,
        height: height,
        width: width,
        xpos: x,
        ypos: y,
        stag: tag,
        id: spriteid,
        color: color(random(255),random(255),random(255)),
    }
    spriteid++;
    spritesarray.push(shape)
    return shape
}

function alreadyexists(spritecheck){
    for (let i = 0; i < spritesarray.length; i++) {
        if((spritesarray[i].img == spritecheck.img)&& (spritesarray[i].xpos == spritecheck.xpos) && (spritesarray[i].ypos == spritecheck.ypos)){
            return true
        }
    }
    return false;
}

function drawsprites() {
    for (let i = 0; i < spritesarray.length; i++) {
        if(spritesarray[i].visible == true){
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
}

function drawspriteslist(list){
  if (list.isArray===false){
    print("p5create error - argument is not a list")
  }
  for (let i = 0; i < list.length; i++) {
    image(list[i].img, list[i].xpos, list[i].ypos)
  }
}

function drawspritestag(tag){
  for (let i = 0; i < spritesarray.length; i++) {
    if (spritesarray[i].stag.includes(tag)){
      image(spritesarray[i].img, spritesarray[i].xpos, spritesarray[i].ypos)
    }
  }
}

function addtag(sprite, tag){
  sprite.stag.push(tag)
}

function removetag(sprite, tag){
  index = sprite.stag.findIndex((element) => element == tag)
  if(index !== -1){
    sprite.stag.splice(index, 1)
  }
}

function setsave(name, value) {
    document.cookie = name + "=" + value + ";";

}
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

function removeobject(sprite) {
    spriteidentifier = sprite.id;
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].id == spriteidentifier) {
            spritesarray.splice(i,1)

            break;
        }

    }
}

function removebytag(tag) {
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].stag == tag) {
            spritesarray.splice(i,1)
        }
    }
}

function searchtag(tag) {
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].stag == tag) {
            return(spritesarray[i])
        }  
    }
}

function searchid(id) {
    for (let i = 0; i < spritesarray.length; i++) {
      if (spritesarray[i].id == id){
        return spritesarray[i]
      }
    }
}

function searchrandomlist(list){
    randomnumber = Math.floor(random(0, list.length-1))
  for (let i = 0; i < list.length; i++){
    if (i == randomnumber) {
      return searchid(list[i])
    }
  }
}

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

function movespriteabsolute(sprite, x, y){
    sprite.xpos = x;
    sprite.ypos = y;
}

function movespriterelative(sprite, xory, movement){
  if (xory == "x") {
    sprite.xpos += movement;
  }
  else if (xory == "y") {
    sprite.ypos += movement;
  }
}

function movebytag(tag, xory, movement) {
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].stag == tag) {
            if (xory = "x") {
                spritesarray[i].xpos += movement;
            }
            else if (xory = "y") {
                spritesarray[i].ypos += movement;
            }
        }
    }
}
function collide(sprite, collidesprite) {
    if (((sprite.ypos + sprite.height) > collidesprite.ypos) && ((sprite.xpos + sprite.width) > collidesprite.xpos) && !((sprite.xpos) > collidesprite.xpos + collidesprite.width) && !((sprite.ypos) > collidesprite.ypos + collidesprite.height)) {
        return true;
    }
    else {
        return false;
    }
}
function collidewithtag(sprite, tag) {
    for (let i = 0; i < spritesarray.length; i++) {
        if (spritesarray[i].stag == tag) {      
            if (((sprite.ypos + sprite.height) > spritesarray[i].ypos) && ((sprite.xpos + sprite.width) > spritesarray[i].xpos) && !((sprite.xpos) > spritesarray[i].xpos + spritesarray[i].width) && !((sprite.ypos) > spritesarray[i].ypos + spritesarray[i].height)) {
                
                return true;
            }
        }
    }
    return false;
}
function ifoffscreen(sprite) {
    if ((sprite.xpos + sprite.width < 0 || sprite.xpos > width || sprite.ypos > height || sprite.ypos + sprite.width < 0)) {
        return true;
    }
}

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

function createblankbutton(sprite, clickaction){
    y = sprite.ypos;
    x = sprite.xpos;
    height = sprite.height
    width = sprite.width

    if(mouseIsPressed && (((y + height) > mouseY) && ((x + width) > mouseX) && !((x) > mouseX) && !((y) > mouseY))){
        eval(clickaction)
    }


    fill(0,0,0);
}





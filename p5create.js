
var spritesarray = [];
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
        stag: tag,
    };

    spriteid++;
    spritesarray.push(sprite)
    
    if(alreadyexists(sprite) == false){
        spriteid++;
        spritesarray.push(sprite)
    }
    
    return sprite;

}

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
            if (((sprite.ypos + sprite.img.height) > spritesarray[i].ypos) && ((sprite.xpos + sprite.img.width) > spritesarray[i].xpos) && !((sprite.xpos) > spritesarray[i].xpos + spritesarray[i].img.width) && !((sprite.ypos) > spritesarray[i].ypos + spritesarray[i].img.height)) {
                
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
    height = sprite.img.height
    width = sprite.img.width

    if(mouseIsPressed && (((y + height) > mouseY) && ((x + width) > mouseX) && !((x) > mouseX) && !((y) > mouseY))){
        eval(clickaction)
    }


    fill(0,0,0);
}





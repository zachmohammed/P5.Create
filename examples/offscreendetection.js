function setup(){
    createCanvas(800, 800);
    background(100,100,100)
    rectposx = 200
    rectposy = 250
    textdisplay = "Nothing is off screen"
    testrect =createshape("rect", 100, 100, 100, 200)
}
function draw(){
    background(100,100,100) //clears the hover text on the button
    textSize(28) 
    createbutton((230,230,230),(200,200,200) ,64, 64, 100, 164, "rectposx -= 5", "Move Back"); // moves back
    createbutton((230,230,230),(200,200,200) ,64, 64, 174, 164, "rectposy += 5", "Move Down"); // moves down
    createbutton((230,230,230),(200,200,200) ,64, 64, 174, 90, "rectposy -= 5", "Move Up"); // moves up
    createbutton((230,230,230),(200,200,200) ,64, 64, 248, 164, "rectposx += 5", "Move Foward"); // moves foward
    testrect.xpos = rectposx
    testrect.ypos = rectposy
    text(textdisplay, 100, 80)

    //changes text if the rect is offscreen
    if(ifoffscreen(testrect)){
        textdisplay = "The rect is now off screen"
    }
    else{
        textdisplay = "Nothing is off screen"
    }
    drawsprites()
    
}
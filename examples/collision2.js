function setup(){
    createCanvas(800, 800);
    background(100,100,100);
    testrect1 =createshape("rect", 100, 100, 200, 100, "movingrect")
    testrect2 =createshape("rect", 100, 100, 200, 300, "movingrect")
    testrect3 =createshape("rect", 100, 100, 200, 500, "movingrect")
    borderright = createshape("rect", 800,200, 700,0, "")
    borderleft = createshape("rect", 800,200, -100,0, "")
    movingfoward = true
}
function draw(){
    background(100,100,100);
    if(collidewithtag(borderright,"movingrect")){
        movingfoward = false
    }
    else if(collidewithtag(borderleft,"movingrect")){
        movingfoward = true
    }


    if(movingfoward){

        movebytag("movingrect", "x", 5)
    }
    else{
        movebytag("movingrect", "x", -5)
    }
    
    drawsprites();
}
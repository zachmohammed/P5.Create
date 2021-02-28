function setup(){
    createCanvas(800, 800);
    background(100,100,100);
    testrect1 =createshape("rect", 200, 100,100, 100,  "movingrect")
    testrect2 =createshape("rect",  200, 300,100, 100, "movingrect")
    testrect3 =createshape("rect", 200, 500, 100, 100,  "movingrect")
    borderright = createshape("rect", 700,0,800,200,  "")
    borderleft = createshape("rect", -100,0, 800,200, "")
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
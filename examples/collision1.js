function setup(){
    createCanvas(800, 800);
    background(100,100,100);
    testrect =createshape("rect", 100, 100, 200, 100, "")
    borderright = createshape("rect", 800,200, 700,0, "")
    borderleft = createshape("rect", 800,200, -100,0, "")
    movingfoward = true
}
function draw(){
    background(100,100,100);
    if(collide(testrect, borderright)){
        movingfoward = false
    }
    else if(collide(testrect, borderleft)){
        movingfoward = true
    }


    if(movingfoward){
        testrect.xpos += 5
    }
    else{
        testrect.xpos -= 5
    }
    
    drawsprites();
}
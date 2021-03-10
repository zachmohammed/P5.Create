function setup(){
    createCanvas(800, 800);
    background(100,100,100);
    testrect =createshape("rect", 200, 100,100, 100,  "")
    borderright = createshape("rect",  700,0,100,800, "")
    borderleft = createshape("rect",  0,0,  100,800,"")
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
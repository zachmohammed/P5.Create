var jump = false
var dinosaurspeed = 5
var score = 0
function preload(){
    runsprite = loadImage("examples/Dino_Game/run1.png");
    ground = loadImage("examples/Dino_Game/ground.png");
    enemy1 = loadImage("examples/Dino_Game/enemy1.png");
    enemy2 = loadImage("examples/Dino_Game/enemy2.png");
    enemy3 = loadImage("examples/Dino_Game/enemy3.png");
    restart = loadImage("examples/Dino_Game/restart.png")
    scorefont = loadFont("examples/Dino_Game/font.ttf");
}
function setup(){
    createCanvas(600, 150);
    groundsprite1 = createsprite(ground, 0, 130, 1, "ground")
    groundsprite2 = createsprite(ground, 600, 130, 1, "ground")
    dinosaur = createsprite(runsprite, 20, 80, 1, "player")
    restartbutton = createsprite(restart, 300 - restart.width/2,75 - restart.height/2, 1, "gui")
    dinosauranimation = createanimation(dinosaur, "examples/Dino_Game/run",".png" ,2, 5, "run")
    textFont(scorefont);
    textSize(14);  
}
function draw(){
    background(255,255,255);
    fill(0,0,0)
    text(score.toFixed(5).toString().replace("0.", ""), 525, 20)
    fill(131, 133, 138)
    text("HI " +getsave("high"), 400, 20) 
    moveground()
    enemyspawner()
    hitenemycheck()
    drawsprites();
    
}
function moveground(){
    if(groundsprite1.xpos < -1200){
        groundsprite1.xpos = 600
    }
    else if(groundsprite2.xpos < -1200){
        groundsprite2.xpos = 600
    }
}
function enemyspawner(){
    if(round(random(300)) == 2){
        switch(round(random(3))){
            case 1:
                createsprite(enemy1, 600, 140 - enemy1.height, 1, "enemy")
                break;
            case 2:
                createsprite(enemy2, 600, 140 - enemy2.height, 1, "enemy")
                break;
            case 3:
                createsprite(enemy3, 600, 140 - enemy3.height, 1, "enemy")
                break;
        }
    }
    
}
function duckmanager(){
    if(keyIsDown(DOWN_ARROW)){
        if(dinosauranimation.state != "duck"){
            dinosauranimation.frames = changeframes("examples/Dino_Game/duck",".png" ,2)
            dinosauranimation.state = "duck"
        }
        if(!jump){
            dinosaur.ypos = 105;
        }     
    }
    else{
        if(dinosauranimation.state != "run"){
            dinosauranimation.frames = changeframes("examples/Dino_Game/run",".png" ,2)
            dinosauranimation.state = "run"
        }   
    }
}
function hitenemycheck(){
    if(!collidewithtag(dinosaur, "enemy")){
        movebytag("ground", "x", - 5)
        score += 0.000001;
        drawanimations();
        duckmanager();
        movement();
        movebytag("enemy", "x", -5)
        restartbutton.visible = false
    }
    else{
        restartbutton.visible = true
        if(parseInt(score.toFixed(5).toString().replace("0.", "")) > getsave("high")){
            setsave("high", score.toFixed(5).toString().replace("0.", ""))
        }
        
        createblankbutton(restartbutton, "location.reload()")
    }
}
function movement(){
    dinosaur.ypos += dinosaurspeed;
    if(collidewithtag(dinosaur, "ground")){
        jump = false;
        dinosaurspeed = 0;
        dinosaur.ypos = 88;
    }
    else {
        dinosaurspeed++;
    }

    if(keyIsDown(UP_ARROW)&& jump === false){
        jump = true;
        dinosaurspeed = -13;
    }
}
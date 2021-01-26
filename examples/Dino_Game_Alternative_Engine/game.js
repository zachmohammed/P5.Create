var jump = false
var dinosaurspeed = 5
var score = 0
var dinox = 20;
var dinoy = 80;
var ducking = false;
var enemies = [];
var gameover = false;
var createdbutton = false;
function preload(){
    runsprite = loadImage("run1.png");
    ground = loadImage("ground.png");
    enemy1 = loadImage("enemy1.png");
    enemy2 = loadImage("enemy2.png");
    enemy3 = loadImage("enemy3.png");
    restart = loadImage("restart.png")
    scorefont = loadFont("font.ttf");
}
function setup(){
    createCanvas(600, 150);
    dinosaur = createSprite(30, 80)
    dinosaur.addAnimation("normal","run1.png", "run2.png")
    groundsprite1 = createSprite(0, 130)
    groundsprite2 = createSprite(600,130)
    groundsprite1.addImage(ground)
    groundsprite2.addImage(ground)
    textFont(scorefont);
    textSize(14);

}
function draw(){
    background(255,255,255)
    fill(0,0,0)
    text(score.toFixed(5).toString().replace("0.", ""), 525, 20)
    fill(131, 133, 138)
    text("HI " +getsave("high"), 400, 20)
    hitenemycheck();
    drawSprites();
}
function moveground(){
    groundsprite1.position.x -= 5
    groundsprite2.position.x -= 5

    if(groundsprite1.position.x < -600){
        groundsprite1.position.x = 600
    }
    else if(groundsprite2.position.x < -600){
        groundsprite2.position.x = 600
    }
}
function movement(){
    dinosaur.position.y += dinosaurspeed;
    if(dinosaur.collide(groundsprite1) || dinosaur.collide(groundsprite2)){
        jump = false;
        dinosaurspeed = 0;
        dinosaur.position.y = 100;
    }
    else {
        dinosaurspeed++;
    }
    if(keyIsDown(UP_ARROW)&& jump === false){
        jump = true;
        dinosaurspeed = -13;
    }
}
function enemyspawner(){
    if(round(random(300)) == 2){
        switch(round(random(3))){
            
            case 1:
                enemy =createSprite(600, 150 - enemy1.height)
                enemy.addImage(enemy1)
                append(enemies, enemy)
                break;
            case 2:
                enemy =createSprite(600, 155 - enemy2.height)
                enemy.addImage(enemy2)
                append(enemies, enemy)
                break;
            case 3:
                enemy = createSprite(600, 155 - enemy3.height)
                enemy.addImage(enemy3)
                append(enemies, enemy)
                break;
        }
    }
    
}
function moveenemis(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].position.x -= 5
    }
}

function checkenemyhit(){
    for(let i = 0; i < enemies.length; i++){
        if(dinosaur.collide(enemies[i])){
            return true
        }
    }
    return false
}
function hitenemycheck(){
    if(checkenemyhit() == true || gameover == true){
        gameover = true
        if(keyIsDown(ENTER)){
            location.reload()
        }
    }
    else{
        score += 0.000001;
        
        moveground();
        enemyspawner();
        duckmanager();
        movement();
        moveenemis();
    }
}
function duckmanager(){
    if(keyIsDown(DOWN_ARROW)){
        if(ducking == false){
            dinosaur.addAnimation("normal", "duck1.png", "duck2.png")
            ducking = true
        }
        
        if(!jump){
            dinosaur.position.y = 96;
        }     
    }
    else{
        if(ducking){
            dinosaur.addAnimation("normal","run1.png", "run2.png")
            ducking = false
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
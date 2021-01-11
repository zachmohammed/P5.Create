// I created this feature since I wanted to create a simple easy to use way of being able to move sprites in a group so I decided this would be the perfect solution without over-complicating things

function setup(){
    createCanvas(800, 800);
    background(100,100,100)
    createshape("rect", 40, 40, 100, 300, "rect1")
    createshape("rect", 40, 40, 100, 340, "rect2")
    createshape("rect", 40, 40, 100, 380, "rect1")
    createshape("rect", 40, 40, 100, 420, "rect2")
    createshape("rect", 40, 40, 100, 460, "rect1")
    createshape("rect", 40, 40, 100, 500, "rect2")
    createshape("rect", 40, 40, 100, 540, "rect1")
    createshape("rect", 40, 40, 100, 580, "rect2")
}
function draw(){
    background(100,100,100)
    createbutton((230,230,230),(200,200,200) ,64, 64, 100, 164, "movebytag(\"rect1\", \"x\", -10)", "Move 1 Left"); // Moves all rect 1's left
    createbutton((230,230,230),(200,200,200) ,64, 64, 100, 90, "movebytag(\"rect1\", \"x\", 10)", "Move 1 Right"); // Moves all rect 1's right
    createbutton((230,230,230),(200,200,200) ,64, 64, 300, 90, "movebytag(\"rect2\", \"x\", 10)", "Move 2 Left"); // Moves all rect 2's left
    createbutton((230,230,230),(200,200,200) ,64, 64, 300, 164, "movebytag(\"rect2\", \"x\", -10)", "Move 2 Right"); // Moves all rect 2's right

    drawsprites()
    
}
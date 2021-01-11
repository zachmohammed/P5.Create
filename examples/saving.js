function setup(){
    createCanvas(800, 800);
    background(100,100,100)
    savestate = 100 //default data to save
    recoveredstate = 0
}
function draw(){
    background(100,100,100) //clears the hover text on the button
    textSize(28) 
    createbutton((230,230,230),(200,200,200) ,64, 64, 100, 100, "setsave(\"saved_data\",savestate)", "Save State"); //creates a button with code to set a save
    createbutton((230,230,230),(200,200,200) ,64, 64, 174, 100, "savestate++", "Increase Data To Save"); //creates a button used to increase the savestate value by one
    createbutton((230,230,230),(200,200,200) ,64, 64, 174, 26, "savestate--", "Decrease Data To Save");
    createbutton((230,230,230),(200,200,200) ,64, 64, 248, 100, "recoveredstate = getsave(\"saved_data\")", "Recover State"); //creates a button used to recover saved data
    
    // text 
    text("Data to save: " + savestate, 100, 200)
    text("Recovered state: " + recoveredstate, 100, 240)
    drawsprites()
    
}
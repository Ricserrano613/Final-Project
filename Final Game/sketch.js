//By Ricardo Serrano

//Buzzer noise as game ends(Completed)

//How to put score onto Scene 3
//Create Intro screen and outro screen(Game Over)


let r = 0;
let g = 0; 
let b = 25;
let t = 15;

var scene1= true;
var scene2= false;

var screen = 0;




// //Start Screen (scene 1)
// var basketballPic 
// // var start = "START"
// var openingText = "Ricky's Super Awesome Basketball Game";
// var bballCourt;




//Game (scene 2)
// var crowd
// var court
var sound
var endGame
var swoosh
var makeShot
var player;
var platform;
var gravity = 0.7;
var jump = 25;
var ball;
var backboard
//PowerUp
var powerUp = 0;
var counter = 0;
//TIMER
var timeleft = 60;
var timer = 0;
var rim;
var score = 0;
var justShot = false;
var theScore = "POINTS"

var didScore = false;
var didScoreTimer = 60; // how long to show the niceshot animation 60 = 1 sec

var playBuzz = false;

function preload() {
  // crowd = loadImage("bballcrowd.jpg");
  // court = loadImage();
  ballImg = loadImage("basketball vector .webp");
  hoop = loadImage ("My Basketball Court (1).jpg");
  sound = loadSound("NBA On NBC Theme 1991-2002.mp3");
  swish = loadSound("Swishnoise.mp3");
  makeShot = loadSound("BBALLswish.mp3");
  endGame = loadSound("Buzzer.mp3");
  
    niceShot = loadImage("nice shot bball.png");

}
  
  
function setup() { 
  createCanvas(1200, 800);
  sound.loop();
  sound.setVolume(0.5);
  


  
  player = createSprite(mouseX, mouseY, 60, 60);
  // player.setCollider("rectangle", 0,0, 100,100);
  //--BALL SIZE --
 ballImg.resize(100,100);
  player.addImage(ballImg);
  player.friction = 0.01;
  
  //Platform
  //fill(0);
  platform = createSprite(20,790,100,20);
 
  
  backboard = createSprite(1108, 285, 3,400);
  //HOOP
  hoopCircle = createSprite(1080, 400, 25, 25);
  //RIM
  rim = createSprite(943,380,1, 25);
  
  //TO CLEAR OUT RIM SO ONLY SPRITE IS VISIBLE
   // rim.visible = false;
   hoopCircle.visible = false;
   
  // hoopCircle.setCollider("circle", 550, 600, 50);
  
  player.restitution = 0.8;
  platform.immovable = true;
  backboard.immovable= true;
  rim.immovable = true;
  
  backboard.visible = false;
  // platform.shapeColor = color('red');
  
 
} 

 

  

function draw() { 
  background(220);
  //COURT//
  image (hoop, -25, -25, width +100,height+80);
  //Audience
  // image(crowd,0, 0, width,260);
  
   player.bounce(platform);
  
  //Screens
  
// if (screen == 0) {
  //startscreen();
//} //else if (screen == 1) {
//scene1 = true;
//} else if (screen == 2) {
  //endscreen();
  //scene1 = false;
  //scene2 = true;
//}
  
  
  player.velocity.y += gravity;
  player.velocity.x += 0;
  //player.velocity.z += gravity;
  
  if(player.bounce(platform)){
    // player.velocity.y=0;
  }
  
  if(player.bounce(backboard) ){
    // player.velocity.x *=-0.7;

  }
  
  if(player.bounce(rim)){
    
  }
  
  //Nice Shot Image//
  
  
  if(player.overlap(hoopCircle)){
    if(justShot){
    	score++;
      	justShot = false;
      
      	// turn this on if you scored
      	didScore = true;
      // image(niceShot, 800, 300, 130,100);
      makeShot.play();
    }
  }
  
  // if you scored, draw the nice shot image and subtract from the timer
  // until it's zero, then everything resets
  if(didScore){
    image(niceShot, width / 2, height / 2, 300,300);
    didScoreTimer--;
    if(didScoreTimer <= 0){
     didScore = false; 
      didScoreTimer = 60;
    }
  }
  
  //
  
  
  
  if(keyDown(UP_ARROW)){
  	powerUp += 0.1;
    powerUp = constrain(powerUp, 0, 20);
    
  }
  
  if (keyWentUp(UP_ARROW)){
    player.velocity.y = (jump + powerUp);
    player.velocity.x = jump/2 + powerUp/2;
    //player.velocity.z = ???
     // player.setSpeed(30, 280);
    swish.play();
     // console.log(player.velocity.y);
  }
  
  

  //--SHOT METER--
  push();
  	fill(255,0,0,random(255));
	stroke(0);
  	strokeWeight(5);
  rect(width / 2,height / 2, 50, 1 - powerUp*20);
  pop();
 
  
  //--Draw Basketball--
  drawSprites();
  
  
  //--SCOREBOARD--
  //--TIMER--
  
  fill (0);
  stroke ('red');
  strokeWeight (4);
  rect (width / 2,0,100, 100); 
  rect (width / 2 - 150,0,100, 100); 
  textSize(50);
  text(timeleft, width / 2 - 125,35,100,100);
  //--SCORE TEXT--
  textSize(60);
  text(score, width / 2 +35,80);
  //Score Text(points)
  push();
  fill('white');
  textSize(20);
  textStyle (BOLD);
  text("TIMER", width / 2 - 130,20);
  text(theScore, width / 2 + 15,20);
  pop();
  
  
  if( frameCount % 60 == 0){
   timeleft --; 
  }
  
  if(timeleft == 0){
    screen = 2;
   timeleft=0; 
    endGame.play();
    endScreen();
  }
  
  
 //Nice shot animation
  
 
  if(timeleft == 0){
    playBuzz = true;
    // just play the sound once

    if(playBuzz){
    endGame.play();
    timeleft = 60;
    playBuzz = false;
    }
  }
//
  
  
  if(player.position.x > width + 20){
   resetLevel(); 
  }
  
  if(player.position.y > height + 20){
    resetLevel();
  }
  
  //if(player.position.z > height + 20) {
  //resetLevel();
//}
  
   
} 


function mousePressed(){
  
  resetLevel();
}


function resetLevel(){
 var randX = random(0, 470);
  var randY = random(255, height);
  //var randZ = random(???);
  
  platform.position.x = randX;
  platform.position.y = randY;
  //platform.position.z = randZ;
  
  player.position.x = randX;
  player.position.y = randY - 65;
  
  player.velocity.x = 0;
  player.velocity.y = 0;
  
  powerUp = 0;
  
  justShot = true;
}

function startScreen() {
   background(25);
    fill(255);
    stroke("Black");
    strokeWeight(4);
    textFont("COMIC SANS MS");
    text('Rickys Super Awesome Basketball Game', width / 2, height / 2);
    text('Click to Start', width / 2, height / 2 + 25);
    reset();
}


function endScreen() {
  background(r + 25, g + 10, b, t);
    text('GAME OVER', width / 2, height / 2)
    text('Score: ', + score, width / 2, height / 2 + 25);
    text('Click to Play again', width / 2, height / 2 + 40);
}



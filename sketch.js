
var monkey , monkey_running,monkey2;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var PLAY=1;
var END=0;
var gameState = PLAY;
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey2=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bananaGroup = new Group();
 obstaclesGroup=new Group();
}



function setup() {
  
  createCanvas(400,400);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,390,800,20);
  ground.velocityX=-4
  ground.shapeColor='green';
  
  console.log(ground.x);

  score=0;
  
}


function draw() {
background("lightblue");
  
  if(gameState === PLAY){
    if(ground.x>0){
  ground.x=ground.width/2;
   }   
      if(keyDown("space")&&monkey.y>200) 
 {
    monkey.velocityY=-10; 
     }
    
    if(bananaGroup.isTouching(monkey)) {
   bananaGroup.destroyEach();
   score = score+1
 }
   
  if(obstaclesGroup.isTouching(monkey)) {
    gameState =END;
   
 } 
    

  }else if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    
    obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
    
    obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1); 
    
    textSize(20);
    fill("red");
    text("GAMEOVER",150,200);
    
   
   
    
    
   
  }
  
 monkey.velocityY=monkey.velocityY+0.8;              
  
  monkey.collide(ground);
  
 
  
  
   stroke("white");
  textSize(20);
  fill("white");
 text("Score: "+ score, 300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime,100,50);
  

  
  
  food();        
  obstacles();
  
  
  
  
 drawSprites();
}

function food(){
if(frameCount%90 === 0){
  var banana =createSprite(600,80,40,10);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.velocityX=-4
  banana.scale=0.1;
  
  banana.lifetime=200;
  
   bananaGroup.add(banana);
  
}
}
function obstacles()
{
  if(frameCount%140 === 0)
  {
    var obstacle = createSprite(400,360,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4
    obstacle.lifetime=200;
    
    obstaclesGroup.add(obstacle);
    
    
  }
}






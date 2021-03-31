var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var bc,bcImage;
var score=0;
var gameOver, restart, sun, sunImage;

function preload(){
  trex_running = loadAnimation("trex1.png",
"trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");  
  groundImage = loadImage("ground2.png");  
  cloudImage = loadImage("cloud.png");  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  bcImage = loadImage("deserts.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);  
  score = 0;
   
  bc = createSprite(790,250,10,10); 
  bc.addAnimation("bg", bcImage);
  bc.scale = 2.5;
    
  trex = createSprite(50,height-40,20,50); 
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 1;
  
  ground = createSprite(width/2,height-10,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2;

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale = 2;
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

invisibleGround=createSprite(width/2,height+50,width,125);
  invisibleGround.visible = false; 
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();  
}

function draw() {
  //trex.debug = true;
  background(255);
  
  if (gameState == PLAY)
  {
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    trex.changeAnimation("running", trex_running);
    
    if(keyDown("space") && trex.y >= 159) 
    {
      trex.velocityY = -12;
    }  
    trex.velocityY = trex.velocityY + 0.8;  
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();  
    if(obstaclesGroup.isTouching(trex))
    {
        gameState = END;
    }
  }
  else if (gameState == END) 
  {
    
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) 
    {
      reset();
    }
  }
  
  if(touches.length > 0 || keyDown ("space") && trex.y >= height-120)
     {
        trex.velocityY = -12;
        trex.velocityY = trex.velocityY + 0.8  
        touches = [];
     }
  drawSprites();
   fill("yellow");
   stroke("pink");
   strokeWeight(10);
   textSize(50);
   textFont("Georgia");
  text("Score: "+ score, 500,60);
}

function spawnClouds() 
{
  if (frameCount % 60 === 0) 
  {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function reset()
{
  score = 0;
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
}

function spawnObstacles() 
{
  if(frameCount % 60 === 0) 
  {
    var obstacle = createSprite(width/2,height-49,width,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    var rand = Math.round(random(1,6));
    switch(rand) 
    {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }           
    obstacle.scale = 1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);

  }
}
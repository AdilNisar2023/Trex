let trexRunning;
let trex;
let ground;
let groundImg;
let cloud;
let cloudImg;
let ground2;
let obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
let obstacle;
let score = 0;
let PLAY = 1;
let END = 0;
let GAMESTATE = PLAY;
let obstaclegroup;
let cloudgroup;
let collided;
let jsound;
let colsound;
let gameover;
let gameRestart;
let gameover1;
let gameRestart1;
function preload() {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png"); //multiple animation
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  collided=loadAnimation("trex_collided.png")
  jsound=loadSound("./trex2-main/jump.mp3")
  colsound=loadSound("./trex2-main/die.mp3")
  gameover1=loadImage("./gameOver.png");
  gameRestart1=loadImage("./restart.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  trex = createSprite(80, 330, 60, 90);
  trex.addAnimation("running", trexRunning);
  trex.addAnimation("collided", collided);
  trex.scale = 0.7;
  ground = createSprite(650, 350, windowWidth, 5);
  ground.addImage(groundImg);
  ground2 = createSprite(80, 367, 70, 20);
  ground2.visible = false;
  console.log(trex.depth);
  obstaclegroup=new Group();
  cloudgroup=new Group();
  gameover=createSprite(650,150,100,100)
  gameover.addImage(gameover1)
  gameover.visible=false
  gameRestart=createSprite(650,210,100,100)
  gameRestart.addImage(gameRestart1)
  gameRestart.visible=false
  
}
function draw() {
  background("white");

  if (GAMESTATE == PLAY) {
    text("Score:" + score, 1200, 100);
    if (frameCount % 10 == 0) {
      score = score + 1;
    }
    ground.velocityX = -8;
    if (ground.x < 20) {
      ground.x += ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 200) {
      jsound.play();
      trex.velocityY = -15;
    }
    trex.velocityY += 0.9;
    createCloud();
    obstacles();
    if(obstaclegroup.isTouching(trex))
    {
        GAMESTATE=END;
        ground.velocityX=0
        trex.velocityX=0
        obstaclegroup.setVelocityXEach(0)
        cloudgroup.setVelocityXEach(0)
        obstaclegroup.setLifetimeEach(-1)
        cloudgroup.setLifetimeEach(-1)
        colsound.play();
        gameover.visible=true
        gameRestart.visible=true
    }
  } else if (GAMESTATE == END) {
    trex.changeAnimation("collided",collided)
    if(mousePressedOver(gameRestart))
    {
        GAMESTATE=PLAY
        obstaclegroup.destroyEach();
        cloudgroup.destroyEach();
        trex.changeAnimation("running",trexRunning)
        gameover.visible=false
        gameRestart.visible=false
    }
   
  }

  trex.collide(ground2);
  drawSprites();
}

function createCloud() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(800, 50, 50, 70);
    cloudgroup.add(cloud);
    cloud.velocityX = -4;
    cloud.addImage(cloudImg);
    cloud.scale = Math.round(random(0.7, 2));
    cloud.y = Math.round(random(20, 100));
    cloud.depth = trex.depth;
    trex.depth += 1;
    console.log(cloud.depth);
    cloud.lifetime = 250;
  }
}
function obstacles() {
  if (frameCount % 60 == 0) {
    obstacle = createSprite(windowWidth - 10, 325, 50, 70);
    obstaclegroup.add(obstacle);
    obstacle.velocityX = -8;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
    }
    obstacle.scale = 0.7;
    obstacle.lifetime = 350;
  }
}


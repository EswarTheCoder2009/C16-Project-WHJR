var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var randomFruit;

var knife, fruit, monster, fruitGroup, monsterGroup;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var gameOverSound, knifeSwooshSound;

function preload() {
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);

  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  knife.setCollider("rectangle", 0, 0, 40, 40);

  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() {
  background("lightblue");
  if(gameState === PLAY) {
    knife.y = mouseY;
    knife.x = mouseX;

    fruits();
    monsters();

    if(knife.isTouching(fruitGroup)) {
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2;
    }

    if(knife.isTouching(monsterGroup)) {
      gameState = END;
      gameOverSound.play();
      fruitGroup.destroyEach();
      monsterGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      monsterGroup.setVelocityXEach(0);
      knife.addImage(gameOverImage);
      knife.scale = 2;
      knife.x = 300;
      knife.y = 300;
    }
  }
  textSize(30);
  fill(0);
  text("Score: " + score, 250, 50)
  drawSprites();
}

function fruits() {
  if(frameCount % 100 === 0) {
    fruit = createSprite(0, Math.round(random(50, 550)), 20, 20);
    fruit.scale = 0.2;
    fruit.velocityX = (7 + (score / 4));
    randomFruit = Math.round(random(1, 4));
    if(randomFruit === 1) {
      fruit.addImage(fruit1);
    } else if(randomFruit === 2) {
      fruit.addImage(fruit2);
    } else if(randomFruit === 3) {
      fruit.addImage(fruit3);
    } else{
      fruit.addImage(fruit4);
    }
    fruit.lifetime = 600 / fruit.velocityX;
    fruitGroup.add(fruit);
  }
}

function monsters() {
  if(frameCount % 50 === 0) {
    monster = createSprite(600, Math.round(random(100, 550)), 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.velocityX = -(8 + (score / 10));
    monster.lifetime = 600 / monster.velocityX;
    monsterGroup.add(monster);
  }
}
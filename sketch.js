var bg,waitimg,play,about,home,restartimg,playerimg,treeImg,playerLeft,axeImg,zombie,heartImg
var gameState="wait"
var logo
var wood,tree,axe
var health=10;
var woodscore=0
var fire,fireimg,fireimg2
var hut,hutimg,hutimg2
var hutBuilt="FALSE"
var treeGroup
var timg1,timg2,timg3,timg4,timg5,timg6
var rand
var axeGroup
var gamemusic


//load images here
function preload(){
waitimg=loadImage("bg1.jpg")
gamemusic=loadSound("zombiegame.mp3")
playimg=loadImage("bg1.png")
aboutimg=loadImage("bga.jpg")
aboutpopimg=loadImage("popupzombie.png")
endbg=loadImage("zombiewin.gif")
restartimg=loadImage("restart.png")
playerimg=loadAnimation("R1.png","R2.png","R3.png","R4.png","R5.png","R6.png","R7.png")
playerLeft=loadAnimation("R1left.png","R2left.png","R3left.png","R4left.png","R5left.png","R6left.png","R7left.png")
treeImg=loadImage("tree1.gif");
axeSwing=loadImage("axe.gif");
zombieImg=loadAnimation("w1.png","w2.png","w3.png","w4.png","w5.png","w6.png");
woodimg=loadImage("woodlog.png")
hutimg2=loadImage("hut/h4.png")
fireimg2=loadImage("fire/f1.png")
boximg=loadImage("scorezombie.png")
timg1=loadImage("t1.png")
timg2=loadImage("t2.png")
timg3=loadImage("t3.png")
timg4=loadImage("t4.png")
timg5=loadImage("t5.png")
timg6=loadImage("t6.png")
zombietouch=loadSound("hit.mp3")


fireimg=loadAnimation("fire/f1.png","fire/f2.png","fire/f3.png","fire/f4.png")
hutimg=loadAnimation("hut/h1.png","hut/h1.png","hut/h1.png","hut/h1.png","hut/h1.png","hut/h1.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h2.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h3.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png","hut/h4.png",)
heartImg=loadImage("heart_1.png")

//playerimg=loadImage("zombie.png")

}

function setup(){
    createCanvas(displayWidth,displayHeight)
    

wood= createSprite(windowWidth/4,100)
wood.addImage(woodimg)
wood.scale=0.5
wood.visible=false;


hut =createSprite(windowWidth/2,windowHeight/2);
hut.visible=false;



logo=createImg("logo.png")
logo.position(windowWidth/2-250,windowHeight/4)
logo.size(500,500)
logo.hide()

play=createImg("play.png")
play.position(50,20)
play.size(100,100)

about=createImg("about2.png")
about.position(50,120)
about.size(100,100)


home=createImg("back.png")
home.position(50,windowHeight-100)
home.size(100,100)
home.hide()

popup1=createSprite(windowWidth/2,windowHeight/2)
popup1.addImage(aboutpopimg)
popup1.visible=false
popup1.scale=1.5


player=createSprite(windowWidth/2,windowHeight/2)
player.addAnimation("walk",playerimg)
player.addAnimation("left",playerLeft)
player.scale=2.1
player.visible=false


zombie=createSprite(200,200,50,50);
zombie.addAnimation("walk",zombieImg)
zombie.visible=false;


box=createSprite(windowWidth-(windowWidth/6),100)
box.addImage(boximg)
heart=createSprite(box.x-(box.width/4),box.y);

box.width=(heart.width)+100
box.height=(heart.height)+100


box.shapeColor="green"
heart.addImage(heartImg);
heart.scale=0.45;


heart.visible=false
box.visible=false


fire=createSprite(windowWidth/4,windowHeight/2-windowHeight/4)
fire.addImage(fireimg2);
fire.scale=0.3
fire.visible=false

treeGroup= new Group()
axeGroup= new Group()



}



function draw(){

    if (gameState==="wait"){
    background(waitimg)
   // player.visible=false
   popup1.visible=false
   player.visible=false
logo.show()
wood.visible=false;
heart.visible=false
box.visible=false
}

if(play.mousePressed(()=>{
gameState="play"
//player.visible=true
home.show()


}))


if(home.mousePressed(()=>{
    gameState="wait"
    }))

if(about.mousePressed(()=>{
    gameState="about"
    //popup1.visible=true
    wood.visible=false;
    heart.visible=false
box.visible=false

    }))

if(gameState==="play"){
    player.velocityX=0
background(playimg)
//image(playimg,0,0,4*windowWidth,2*windowHeight)

gamemusic.play()
logo.hide()
popup1.visible=false
player.visible=true
wood.visible=true;

heart.visible=true
box.visible=true

zombie.debug=true
player.debug=true

zombie.setCollider("circle",0,0,(zombie.width/3))
player.setCollider("circle",0,0,(player.width/4))
spawntrees()

if(keyDown("space")&&player.isTouching(treeGroup)){
  axe.visible=true;
    if(frameCount % 5===0){
      woodscore=woodscore+1;  
    }}
   

}

//camera.x=player.x;
//camera.y=player.y





//camera.position.x=player.position.x



if(keyDown("DOWN_ARROW")){
    player.y +=115
   
  }if(keyDown("UP_ARROW")){
    player.y -=115
   
  }if(keyDown("LEFT_ARROW")){
    player.x -=115
    player.changeAnimation("left",playerLeft);
    
  }if(keyDown("RIGHT_ARROW")){
    player.x +=115
    player.changeAnimation("walk",playerimg);
    
  }

if(gameState==="about"){
   // background(aboutimg)}

   popup1.visible=true
   logo.hide()

    }
    

      if(zombie.isTouching(player)){
        health=health-0.2;
        zombietouch.play()
      }

      if(health<0){
        player.destroy();
        zombie.destroy();
      
      }

 /*   if(keyDown("space")&&player.isTouching(tree)){
      axe.visible=true;
        if(frameCount % 5===0){
          woodscore=woodscore+1;  
        }*/
        
  

    //if(keyWentUp("space")){
      //axe.visible=false;
    //}

    

   

    drawSprites()
    

    if(gameState==="play"){
        textSize(50);
        stroke("black")
        strokeWeight(4)
    fill("red");
    text(woodscore,wood.x, wood.y)
      textSize(38);
        stroke("black")
        strokeWeight(4)

        fill("black")
        stroke("red")
    text(" :"+Math.round(health),heart.x+35,heart.y+5);
   
    zombie.visible=true;

      wood.visible=true;



    
     zombie.bounceOff(player);
    zombie.velocityX = -2;
    if(woodscore===2){
fire.visible=true     
      
    }

    if(woodscore===5 && hutBuilt==="FALSE"){
      hut.visible=true;
      hut.addAnimation("build",hutimg)
      hutBuilt="TRUE";
      woodscore=woodscore-15
    }

 

    if(hutBuilt==="TRUE"){
      hut.addImage(hutimg2)
    }

    zombie.pointTo(player.x,player.y)
    zombie.rotateToDirection= true;
    zombie.VelocityX=-3;

   



    }


  }

function spawntrees(){

if(frameCount%200 ===0){

  tree=createSprite(windowWidth/2,200)
    tree.scale=1;
    tree.x=Math.round(random(100,windowWidth-100))
    tree.y=Math.round(random(200,windowHeight-100))
    axe=createSprite(1100,300);
axe.addImage(axeSwing);
//axe.visible=false;
axe.scale=0.6;
axe.x=tree.x
axe.y=tree.y+20
  rand= Math.round(random(1,6))
  switch(rand){
 
    case 1: tree.addImage(timg1);
    break;
    
    case 2: tree.addImage(timg2);
    break;
    
    case 3: tree.addImage(timg3);
    break;
 
    case 4: tree.addImage(timg4);
    break;
 
    case 5: tree.addImage(timg5);
    break;
 
    case 6: tree.addImage(timg6);
    break
 
    default:
      break;
  }
  treeGroup.add(tree)
  axeGroup.add(axe)
 
      
 }



  
}
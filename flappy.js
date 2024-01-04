//Flappy ball
"use strict";

let cnv1 = document.getElementById("flappyCanvas");
let ctx1 = cnv1.getContext("2d");
cnv1.width = 500;
cnv1.height = 800;

//Global Variables
let ballX = 200;
let ballY = 500;
let flap = false;
let gravity = 0;
let ground = 650;
let radius = 17.5;
let start = false;
let flappyReveal = document.getElementById('flappyhide');
let score = 1;
let modeSpeed = true;
let collision = true;
let stopMode = true;
let ballColor = 'yellow';
let skyColor = "rgb(46, 151, 221)";
let obsColor = 'green';
let groundColor = 'green';
let darkmodeGround = 'green';

// rectangle objects
let rects1 = {x: cnv1.width, y: -100 + Math.random()*200 - 100, w: 60, h: 400, speed: 0}
let rects2 = {x: cnv1.width + 275, y: -100 + Math.random()*200 - 100, w: 60, h: 400, speed: 0}


requestAnimationFrame(loop);

//Main Loop
function loop() {
  //Flap
  if (start) {
    ballY += gravity;
    //Gravity
    gravity += .65;
  }
    //Draw Sky
    ctx1.fillStyle = skyColor;
    ctx1.fillRect(0, 0, 500, 650);


    //Loop obsticles   
    rects1.x -= rects1.speed;
    if(rects1.x < -60){
      rects1.x = cnv1.width;
      rects1.y = -100 + Math.random()*200 - 100;
    }

    //Loop obsticles 2
    rects2.x -= rects1.speed;
    if(rects2.x < -60){
      rects2.x = cnv1.width;
      rects2.y = -100 + Math.random()*200 - 100;
    }

    //Draw Obstcle 1
    ctx1.fillStyle = obsColor;
    ctx1.fillRect(rects1.x, rects1.y, rects1.w, rects1.h);
    ctx1.fillRect(rects1.x, rects1.y+550, rects1.w, rects1.h);

    //Draw Obstcle 2
    ctx1.fillStyle = obsColor;
    ctx1.fillRect(rects2.x, rects2.y, rects2.w, rects2.h);
    ctx1.fillRect(rects2.x, rects2.y+550, rects2.w, rects2.h);

    //Draw ball
    ctx1.fillStyle = ballColor;
    ctx1.beginPath();
    ctx1.arc(200, ballY, radius, 0, 2 * Math.PI);
    ctx1.fill();

    //Draw Ground
    ctx1.fillStyle = groundColor;
    ctx1.fillRect(0, ground, 500, 150);
    
    //Border for Darkmode
    ctx1.fillStyle = darkmodeGround;
    ctx1.fillRect(0, 650, 500, 5);


    //Stop if ball hits ground or goes too high
    if (ballY > ground - 30 || ballY < -300) {
      flappyReveal.classList.remove('hide');
      rects1.speed = 0;
      collision = false;
      stopMode = false;

      //Stop ball from goinf through canvas
      if (ballY + radius > ground) {
        gravity = 0;
      }
    } 

    //Stop if ball hits obsticle OB1
    if (ballX + radius > rects1.x && rects1.x + 90 > ballX + radius && ballY + radius > rects1.y && ballY + radius < rects1.y + 437) {
      rects1.speed = 0;
      collision = false;
      flappyReveal.classList.remove('hide');
      stopMode = false;
    }


    //Stop if ball hits obsticle OB2
    if (ballX + radius > rects2.x && rects2.x + 90 > ballX + radius && ballY + radius > rects2.y && ballY + radius < rects2.y + 437) {
      rects1.speed = 0;
      collision = false;
      flappyReveal.classList.remove('hide');
      stopMode = false;
    }

    //Stop if ball hits bottom OB1
    if (ballX + radius > rects1.x && rects1.x + 85 > ballX + radius && ballY + radius > rects1.y + 546 && ballY + radius < rects1.y + 950) {
      rects1.speed = 0;
      collision = false;
      flappyReveal.classList.remove('hide');
      stopMode = false;
    }

    // Stop if ball hits bottom OB2
    if (ballX + radius > rects2.x && rects2.x + 85 > ballX + radius && ballY + radius > rects2.y + 546 && ballY + radius < rects2.y + 950) {
      rects1.speed = 0;
      collision = false;
      flappyReveal.classList.remove('hide');
      stopMode = false;
    }

    let ob1x = rects1.x + 60;
    let ob2x = rects2.x + 60;

    //Scorekeeper
    if (ballX == ob1x|| ballX == ob2x) {
      score++;
      document.getElementById('score').innerHTML = score;
      console.log(score)
    }

    requestAnimationFrame(loop);
}  
 

//Event listner
document.addEventListener("keydown", fly);
document.getElementById('hard').addEventListener('click', hardMode);
document.getElementById('extreme').addEventListener('click', extremeMode);
document.getElementById('colorpicker').addEventListener('change', changeColor);
document.getElementById('darkmode').addEventListener('click', darkMode)

//Function
function fly(event) {
  //Collision Stop
  if (collision) {
    if (event.code == "Space") {
      start = true;
    }
    if (start) {
      if (modeSpeed) {
      rects1.speed = 4;
      }
      if (event.code == "Space") {
        console.log(event.code);
        //height of jump
        gravity = -10.5;
      }
    }
  } 
}

//Change speed to hard
function hardMode() {
  if (stopMode) {
    if (start) {
      modeSpeed = false;
      rects1.speed = 6;
      console.log(start)
    }
  }
}


function extremeMode() {
  if (stopMode) {
    if (start) {
      modeSpeed = false;
      rects1.speed = 8;
      console.log(start)
    }
  }
}

function changeColor() {
  ballColor = document.getElementById('colorpicker').value;
}

function darkMode() {
  skyColor = 'black';
  obsColor = 'white';
  ballColor = 'white';
  groundColor = 'black';
  darkmodeGround = 'white';

  document.getElementById('flappydeath').classList.remove('flappydeath');
  document.getElementById('flappydeath').classList.add('darkmodediv');
}




//if flappy ball is hidden dont cancel keys for flappy ball
//if class hide is applied to flappy ball then cancel keys for flappy ball
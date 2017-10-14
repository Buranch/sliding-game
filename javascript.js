var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 0;
var dy = 0;
//Defining a paddle
var paddleHeight = 15;
var paddleWidth = 90;
var paddleX = (canvas.width - paddleWidth) / 2;


var ballRadius = 15;

var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var gameStage = "new";
var score = 0;
var level = 1;
//Setting up the brick variables
var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 100;
var brickHeight = 25;
var brickPadding = 10;
var brickOffsetTop = 10;
var brickOffsetLeft = 10;
var c;
var r;
//Holding all bricks in to 2D array
var bricks = [];
for(c = 0 ; c< brickColumnCount; c++){
  bricks[c] = [];
  for(r = 0; r<brickRowCount; r++){
    bricks[c][r] = {x: 0, y: 0, status: 1};
  }
}
//Brick Drawing Logic
function drawBricks(){
  for(c = 0 ; c< brickColumnCount; c++){
    for(r = 0; r<brickRowCount; r++){
      if(bricks[c][r].status == 1){
          var brickX = c*(brickWidth+brickPadding)+brickOffsetLeft;
          var brickY = r*(brickHeight+brickPadding)+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX,brickY,brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
      }
    }
  }
}
//A collision Detection function

function collisionDetection(){
  for(c = 0 ; c< brickColumnCount; c++){
    for(r = 0; r<brickRowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){

        if(x > b.x && x < b.x+brickWidth && y > b.y+ballRadius  && y < b.y+brickHeight+ballRadius){
            console.log("BricksX "+bricks.x);
            // alert("Collision at x");
            b.status = 0;
            dy = -dy;
            score +=1;

            $("#score").text("Score: "+score);



        }
      }
    }
  }

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    //ctx.fillStyle = "#0095DD";
    ctx.fillStyle = "#640f37";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    //ctx.fillStyle = "#0095DD";
    ctx.fillStyle = "#640f37";
    ctx.fill();
    ctx.closePath();
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();


    x += dx;
    y += dy;
    if (x + dx > canvas.width - ballRadius || x + dy < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - 30) {
            if (paddleX <= x && paddleX + paddleWidth >= x) {
                dy = -dy;

            } else {
              paddleX = (canvas.width - paddleWidth) / 2;
              y = canvas.height - 30;
              x = canvas.width / 2;
              dx = 0;
              dy = 0;
              setInterval(openModal(0),10);
              gameStage = "lose";
                //document.location.reload();

            }

        }
    }
    if (canvas.width - paddleWidth > paddleX && rightPressed) {
        paddleX += 7;
    } else if (paddleX > 0 && leftPressed) {
        paddleX -= 7;
    }

}
$("#score").text("Score: "+score);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
//--------------------DropDown
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                console.log("Showwing content");
            }
        }
    }
}

function levelSelected(n) {
    level = n;
    console.log("Selected! " + n);
    $("#prompt").text("Level " + n);
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            console.log("Showwing content");
        }
    }
}
var modal = document.getElementById('myModal');
//------------------Modal
function openModal(n){
  if(n == 0){
      $(".dropdown").html("<h2>Game Over </h2><br> <h4>Level: "+level+"</h4> <br><p>Score: "+score+"</p>");
      n = 1;
      $("#startButton").text("Try Again");
      $("#welcome").text("Result");

  }
  var modal = document.getElementById('myModal');

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        closeModal(gameStage);
        //modal.style.display = "none";
    }

}
openModal(1);
function closeModal(){
  if(gameStage == "lose"){
    document.location.reload();
  }
  $("#level").text("Level "+level);

  modal.style.display = "none";
  x = canvas.width / 2;
  y = canvas.height - 30;
  var c;
  switch(level){
    case 1:
      c = 1.5;
      break;
    case 2:
      c = 2.5;
      break;
    case 3:
      c = 3;
      break;
    case 4:
      c = 4.5;
      break;
    case 5:
      c = 5;
      break;
  }

  dx = c;
  dy = -c;
  setInterval(draw, 10);

}
function gaveOver(){
  alert("Game Over");
}
function dReload(){
  document.location.reload();
}

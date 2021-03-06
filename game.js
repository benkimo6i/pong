var canvas;
var canvasContent;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

var p1Score = 0;
var p2Score = 0;
const WINNING_SCORE = 3;

var gameOver = false;



function calcMouse(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};

}

function startGame(evt){
	if(gameOver){
		p1Score = 0;
		p2Score = 0;
		gameOver = false;
	}
}

window.onload = function(){
	canvas = document.getElementById("gameCanvas");
	canvasContent = canvas.getContext("2d");

	var fPS = 30; // frames per second
	setInterval(function(){
		animateMotion();
		drawCanvas();
	}, 1000/fPS);

	canvas.addEventListener('mousedown',startGame)

	canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calcMouse(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2)
		})
}

function ballReset(){
	if (p1Score >= WINNING_SCORE || p2Score >= WINNING_SCORE) {
		gameOver = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function aiMove(){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY-35){
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY+35){
		paddle2Y -= 6;
	}
}

function animateMotion(){
	if (gameOver) {
		return;
	}

	aiMove();

	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if (ballX > canvas.width){
		if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.33;
		} else {
			p1Score ++; //must be before ball reset
			ballReset();
		}
	} else if (ballX < 0){
		if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.33;
		} else {
			p2Score ++; //must be before ball reset
			ballReset();
		}
	} else if (ballY > canvas.height){
		ballSpeedY = -ballSpeedY;
	} else if (ballY < 0){
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet(){
	for(var i=0;i < canvas.height; i+=40) {
		drawOnCanvas(canvas.width/2-1,i,2,20,'white');
	}
}

function drawCanvas(){
	// create screen 
	drawOnCanvas(0,0,canvas.width,canvas.height,"black");

	if (gameOver) {
		canvasContent.fillStyle = 'white';
		if (p1Score >= WINNING_SCORE){
			console.log("ok");
			canvasContent.fillText("Player 1 Wins!", 350, 200);
		} else if (p2Score >= WINNING_SCORE){
			canvasContent.fillText("Player 2 Wins!", 350, 200);
		}

		canvasContent.fillText("click to continue", 350, 500);
		return;
	} 
	drawNet();
	// create left paddle 
	drawOnCanvas(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"white");
	// create right paddle 
	drawOnCanvas(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"white");
	// create ball
	drawBall(ballX,ballY,7,"white");

	canvasContent.fillText(p1Score, 100, 100);
	canvasContent.fillText(p2Score, canvas.width - 100, 100);
}

function drawOnCanvas(leftX,topY, width,height, drawColor){
	canvasContent.fillStyle = drawColor;
	canvasContent.fillRect(leftX,topY, width,height);
}

function drawBall(centerX, centerY, radius, drawColor){
	canvasContent.fillStyle = drawColor;
	canvasContent.beginPath();
	canvasContent.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContent.fill();
}




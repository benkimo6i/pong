var canvas;
var canvasContent;
var ballX = 50;
var ballSpeedX = 5;

window.onload = function(){
	canvas = document.getElementById("gameCanvas");
	canvasContent = canvas.getContext("2d");

	var fPS = 30; // frames per second
	setInterval(function(){
		animateMotion();
		drawCanvas();
	}, 1000/fPS);
}

function animateMotion(){
	ballX = ballX + ballSpeedX;
	if (ballX > canvas.width){
		ballSpeedX = -ballSpeedX;
	} else if (ballX < 0){
		ballSpeedX = -ballSpeedX;
	}
}

function drawCanvas(){
	// create screen 
	drawOnCanvas(0,0,canvas.width,canvas.height,"black"); 
	// create left paddle 
	drawOnCanvas(0,200,10,100,"white");
	// create ball
	drawBall(ballX,150,7,"white");
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




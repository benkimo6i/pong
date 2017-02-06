var canvas;
var canvasContent;
var ballX = 50;

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
	ballX = ballX + 5;
}

function drawCanvas(){
	canvasContent.fillStyle = "black";
	canvasContent.fillRect(0,0,canvas.width,canvas.height)
	canvasContent.fillStyle = "white";
	canvasContent.fillRect(0,200,10,100);
	canvasContent.fillStyle = "white";
	canvasContent.fillRect(ballX,100,10,10);
}
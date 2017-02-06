var canvas;
var canvasContent;

window.onload = function(){
	canvas = document.getElementById("gameCanvas");
	canvasContent = canvas.getContext("2d");
	canvasContent.fillStyle = "black";
	canvasContent.fillRect(0,0,canvas.width, canvas.height);
}
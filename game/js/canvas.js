//let canvasWidth = window.innerWidth;
//let canvasHeight = window.innerHeight;

let canvasWidth = 1280;
let canvasHeight = 720;

var canvas = document.getElementById("farmlingViewport");
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);

var context = canvas.getContext("2d");
	context.fillStyle = "rgb(0, 162, 232)";
	context.fillRect(555, 467, 150, 120);

	context.beginPath();
	context.fillStyle = "rgb(0, 55, 55)";
	context.arc(423, 93, 70, 0, 2 * Math.PI, true);
	context.fill();

	context.font = '24px "Arial"';
	context.fillStyle = "rgba(0, 55, 55, 0.2)";
	context.fillText("Hello To Farmling!", 540, 600);

	let imgPlayer= new Image();
	imgPlayer.src= "game/img/player.png";

	imgPlayer.onload = function(){
	context.drawImage(imgPlayer, 20, 80, 256, 512);
	};

//let canvasWidth = window.innerWidth;
//let canvasHeight = window.innerHeight;

let canvasWidth = 1280;
let canvasHeight = 720;

let canvas = document.getElementById("farmlingViewport");
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
let context = canvas.getContext("2d");

	context.fillStyle = "rgb(0, 162, 232)";
	context.fillRect(320, 32, 928, 656);


	context.font = '24px "Arial"';
	context.fillStyle = "rgba(0, 55, 55, 0.2)";
	context.fillText("Hello To Farmling!", 542, 24);


	let imgPlayer = new Image();
	imgPlayer.src = "game/img/player.png";

	imgPlayer.onload = function(){
	context.drawImage(imgPlayer, 32, 104, 256, 512);
	};

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
	let imgPantsBlue = new Image();
	let imgSkirtBlue = new Image();
	let imgHatBlue = new Image();
	imgPlayer.src = "game/img/player.png";
	imgPantsBlue.src = "game/img/pants/pantsBlue.png";
	imgSkirtBlue.src = "game/img/skirt/skirtBlue.png";
	imgHatBlue.src = "game/img/hat/hatBlue.png";

	imgPlayer.onload = function(){
	context.drawImage(imgPlayer, 32, 104, 256, 512);
		context.drawImage(imgPantsBlue, 32, 380, 256, 206);
			context.drawImage(imgSkirtBlue, 32, 134, 256, 324);
				context.drawImage(imgHatBlue, -42, -94, 384, 384);
		};

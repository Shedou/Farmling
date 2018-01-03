//let canvasWidth = window.innerWidth;
//let canvasHeight = window.innerHeight;
/*
	let widh = window.innerWidth;

	let canvasStyle = document.getElementById("farmlingViewport");
	if (window.innerWidth > window.innerHeight && window.innerWidth >= 1920){
		canvasStyle.style.width = '90%';
	}


	//зона кэширования
	let imgPlayer = new Image();
	let imgPantsBlue = new Image();
	let imgSkirtBlue = new Image();
	let imgHatBlue = new Image();
	imgPlayer.src = "game/img/player.png";
	imgPantsBlue.src = "game/img/pants/pantsBlue.png";
	imgSkirtBlue.src = "game/img/skirt/skirtBlue.png";
	imgHatBlue.src = "game/img/hat/hatBlue.png";

	//настройки
	let canvasWidth = 3840;
	let canvasHeight = 2160;

	//создание вьюпорта
	let canvas = document.getElementById("farmlingViewport");
		canvas.setAttribute('width', canvasWidth);
		canvas.setAttribute('height', canvasHeight);
	let context = canvas.getContext("2d");

	//Приветствие
	context.font = '24px "Arial"';
	context.fillStyle = "rgba(0, 55, 55, 0.2)";
	context.fillText("Hello To Farmling!", 542, 24);

	//зона игры
	context.fillStyle = "rgb(0, 162, 232)";
	context.fillRect(328, 32, 952, 656);

	//зона персонажа
	imgHatBlue.onload = function(){
	context.drawImage(imgPlayer, 0, 32, 328, 656);
	context.drawImage(imgPantsBlue, 32, 380, 256, 206);
	context.drawImage(imgSkirtBlue, 32, 134, 256, 324);
	context.drawImage(imgHatBlue, -42, -94, 384, 384);
	};
*/
let gl;

function initWebGL(canvas){
	gl = null;

	try {
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e){}

	if (!gl) {
		alert("не пашет");
	gl = null;
	}

	return gl;
}

function  start() {
	let canvas = document.getElementById("glFarm");

	gl = initWebGL(canvas);

	canvas.width = 1920;
	canvas.height = 1080;
	if(gl){
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	}


}

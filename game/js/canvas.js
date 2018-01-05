"use strict";
let canvasWidth = window.innerWidth - 30;
let canvasHeight = window.innerHeight - 30;
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
/*
 let imgPlayer = new Image();
 imgPlayer.src = "game/img/player.png";

 let gl;

 function initTextures() {
 cubeTexture = gl.createTexture();
 cubeImage = new Image();
 cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
 cubeImage.src = "cubetexture.png";
 }

 function handleTextureLoaded(image, texture) {
 gl.bindTexture(gl.TEXTURE_2D, texture);
 gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
 gl.generateMipmap(gl.TEXTURE_2D);
 gl.bindTexture(gl.TEXTURE_2D, null);
 }

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
 gl.clearColor(0.9, 0.8, 0.4, 1.0);
 gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

 gl.activeTexture(gl.TEXTURE0);
 gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
 gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

 }


 }
 */
let cubeRotation = 0.0;

main();

//
// Start here
//
function main() {
	let canvas = document.querySelector('#glFarm');
	const gl = canvas.getContext('webgl');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	// Vertex shader program
	const vsSource = `attribute vec4 aVertexPosition; attribute vec2 aTextureCoord; uniform mat4 uModelViewMatrix; uniform mat4 uProjectionMatrix; varying highp vec2 vTextureCoord; void main(void) {gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition; vTextureCoord = aTextureCoord;}`;

	// Fragment shader program
	const fsSource = `varying highp vec2 vTextureCoord; uniform sampler2D uSampler; void main(void) {gl_FragColor = texture2D(uSampler, vTextureCoord);}`;
	const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
	const programInfo = {	program: shaderProgram, attribLocations: { vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'), textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord')},
							uniformLocations: {projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'), modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'), uSampler: gl.getUniformLocation(shaderProgram, 'uSampler')},};

	const buffers = initBuffers(gl);
	const texture = loadTexture(gl, '/game/img/player.png');
	let then = 0;
	function render(now) {
		now *= 0.005;
		const deltaTime = now - then;
		then = now;
		drawScene(gl, programInfo, buffers, texture, deltaTime);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

function initBuffers(gl) {
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	const positions = [
		//морда
		-1.0, -1.0, 1.0,
		1.0, -1.0, 1.0,
		1.0, 1.0, 1.0,
		-1.0, 1.0, 1.0,
		//зад
		-1.0, -1.0, -1.0,
		-1.0, 1.0, -1.0,
		1.0, 1.0, -1.0,
		1.0, -1.0, -1.0,
		//верх
		-1.0, 1.0, -1.0,
		-1.0, 1.0, 1.0,
		1.0, 1.0, 1.0,
		1.0, 1.0, -1.0,
		//низ
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0, 1.0,
		-1.0, -1.0, 1.0,
		//право
		1.0, -1.0, -1.0,
		1.0, 1.0, -1.0,
		1.0, 1.0, 1.0,
		1.0, -1.0, 1.0,
		//лево
		-1.0, -1.0, -1.0,
		-1.0, -1.0, 1.0,
		-1.0, 1.0, 1.0,
		-1.0, 1.0, -1.0,
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	const textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

	const textureCoordinates = [
		//морда
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		//зад
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		//верх
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		//низ
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		//право
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
		//лево
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
		gl.STATIC_DRAW);

	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	const indices = [
		0, 1, 2, 0, 2, 3,//морда
		4, 5, 6, 4, 6, 7,//зад
		8, 9, 10, 8, 10, 11,//верх
		12, 13, 14, 12, 14, 15,//низ
		16, 17, 18, 16, 18, 19,//право
		20, 21, 22, 20, 22, 23,//лево
	];

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
		new Uint16Array(indices), gl.STATIC_DRAW);

	return {position: positionBuffer, textureCoord: textureCoordBuffer, indices: indexBuffer};
}

function loadTexture(gl, url) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	const level = 0;
	const internalFormat = gl.RGBA;
	const width = 1;
	const height = 1;
	const border = 0;
	const srcFormat = gl.RGBA;
	const srcType = gl.UNSIGNED_BYTE;
	const pixel = new Uint8Array([0, 0, 255, 255]);
	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
		width, height, border, srcFormat, srcType,
		pixel);

	const image = new Image();
	image.onload = function () {
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
			srcFormat, srcType, image);
		if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
			gl.generateMipmap(gl.TEXTURE_2D);
		} else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}
	};
	image.src = url;
	return texture;
}

function isPowerOf2(value) {
	return (value & (value - 1)) == 0;
}

function drawScene(gl, programInfo, buffers, texture, deltaTime) {
	gl.viewport(0, 0, canvasWidth, canvasHeight);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	const fieldOfView = 60 * Math.PI / 180;
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 5.5;
	const zFar = 7.5;
	const projectionMatrix = mat4.create();

	mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
	const modelViewMatrix = mat4.create();

	mat4.translate(modelViewMatrix,
		modelViewMatrix,
		[-0.0, 0.0, -6.0]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [0, 0, 1]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * .7, [0, 1, 0]);

	{
		const numComponents = 3;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
		gl.enableVertexAttribArray(
			programInfo.attribLocations.vertexPosition);
	}

	{
		const numComponents = 2;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
		gl.vertexAttribPointer(
			programInfo.attribLocations.textureCoord, numComponents, type, normalize, stride, offset);
		gl.enableVertexAttribArray(
			programInfo.attribLocations.textureCoord);
	}

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
	gl.useProgram(programInfo.program);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

	{
		const vertexCount = 36;
		const type = gl.UNSIGNED_SHORT;
		const offset = 0;
		gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
	}

	cubeRotation += deltaTime;
}

function initShaderProgram(gl, vsSource, fsSource) {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert('типо шейдеры не сделались: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}
	return shaderProgram;
}

function loadShader(gl, type, source) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert('шейдеры не коплинулись: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}
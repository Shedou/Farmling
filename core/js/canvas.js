
var canvas = document.getElementById("farmling_viewport");
//canvas.setAttribute('width', bodySize.width * 0.8);
//canvas.setAttribute('height', bodySize.width * 0.65);
canvas.setAttribute('width', 1280);
canvas.setAttribute('height', 720);
var context = canvas.getContext("2d");
context.fillStyle = "rgb(0, 162, 232)";
context.fillRect(415, 315, 150, 120);

context.beginPath();
context.fillStyle = "rgb(0, 55, 55)";
context.arc(423, 93, 70, 0, 2 * Math.PI, true);
context.fill();

context.font = '24px "Arial"';
context.fillStyle = "rgba(0, 55, 55, 0.2)";
context.fillText("Hello To Farmling!", 540, 600);
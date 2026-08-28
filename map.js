const canvas = document.getElementById("gameCanvas");

const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 800;

context.fillStyle = "white";

context.fillRect(0, 0, canvas.width, canvas.height);

// Load map image
const mapImage = new Image();
mapImage.src = "maps/map.png";

mapImage.onload = () => {
    context.drawImage(mapImage, -300, -400);
}
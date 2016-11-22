import BarChart3D from "./BarChart3D";

const element = document.createElement("span");
document.body.appendChild(element);

// https://color.adobe.com/pl/Phaedra-color-theme-1764754
const chart = new BarChart3D(element, [
	{color: 0xFF6138, height: 40},
	{color: 0xFFFF9D, height: 60},
	{color: 0xBEEB9F, height: 55},
	{color: 0x79BD8F, height: 15},
	{color: 0x00A388, height: 90}
], {width: window.innerWidth, height: window.innerHeight});

window.addEventListener("resize", function () {
	chart.setSize({width: window.innerWidth, height: window.innerHeight});
});

element.addEventListener("mousemove", function (e) {
	chart.moveCamera({x: 0.25 * (e.pageX - window.innerWidth / 2), y: 0.1 * (e.pageY - window.innerHeight / 2)});
});

function loop() {
	chart.update();
	requestAnimationFrame(loop);
}

loop();
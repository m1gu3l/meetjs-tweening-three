import BarChart3D from "./BarChart3D";
import Tweener from "./tweening/Tweener";
import {Color} from "three";

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

const tweener = new Tweener();

tweener.interpolation.addInterpolator(
	(key, from, to) => from instanceof Color && to instanceof Color,
	(from, to) => (p) => p === 0 ? from : p === 1 ? to : from.clone().lerp(to, p),
	1
);

// chart.cubes[2].scale equals { x: 1, y: 1, z: 1 }
tweener.allFrom(chart.cubes.map(cube => cube.material), {color: new Color(0x333333)}, 2000, 1000, 100, "elasticInOut");
tweener.allFrom(chart.cubes.map(cube => cube.position), { y: "-100" }, 2000, 1000, 100, "quadIn");
tweener.allTo(chart.cubes.map(cube => cube.position), { y: "-100" }, 2000, 5000, 100, "quadOut");
tweener.allTo(chart.cubes.map(cube => cube.material), {color: new Color(0x333333)}, 2000, 5000, 100, "elasticInOut");

function loop() {
	tweener.update();
	chart.update();
	requestAnimationFrame(loop);
}

loop();
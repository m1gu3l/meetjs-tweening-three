import {
	PerspectiveCamera,
	Scene,
	Fog,
	WebGLRenderer,
	Mesh,
	BoxGeometry,
	PlaneGeometry,
	MeshFaceMaterial,
	MeshLambertMaterial,
	AmbientLight,
	PointLight,
	Shape,
	ExtrudeGeometry,
	PCFSoftShadowMap
} from "three";

export default class BarChart3D {

	constructor(element, cubes = [], size = {width: 500, height: 500}) {
		this._element = element;
		this._setupThree();

		this.setSize(size);

		this._cubes = cubes.map(c => Object.assign({}, cubeDefaults, c)).map((c, i) => {
			const geometry = new BoxGeometry(c.width, c.height, c.depth);
			const material = new MeshLambertMaterial({color: c.color});
			const cube = new Mesh(geometry, material);
			cube.position.x = cubes.length === 1 ? 0 : i * 200 / (cubes.length - 1) - 100;
			cube.position.y = c.height / 2 - 50;
			cube.castShadow = true;
			cube.receiveShadow = true;
			this._scene.add(cube);

			return cube;
		});

		const floor = checkeredPlane(500, 500, 25);
		floor.position.y = -50;
		floor.rotation.x = -Math.PI / 2;
		floor.receiveShadow = true;
		this._scene.add(floor);

		this._logo = vistexLogo();
		this._logo.scale.x = this._logo.scale.y = 2;
		this._logo.position.z = -200;
		this._logo.castShadow = true;
		this._logo.receiveShadow = true;
		this._scene.add(this._logo);
	}

	get cubes() {
		return this._cubes;
	}

	get logo() {
		return this._logo;
	}

	get ambientLight() {
		return this._ambientLight;
	}

	get pointLight() {
		return this._pointLight;
	}

	get fog() {
		return this._scene.fog;
	}

	update() {
		this._renderer.render(this._scene, this._camera);
	}

	setSize({width, height}) {
		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(width, height);
	}

	moveCamera({x, y}) {
		this._logo.lookAt(this._camera.position);
		this._camera.position.x = x;
		this._camera.position.y = -y;
		this._camera.lookAt(this._scene.position);
	}

	_setupThree() {
		this._scene = new Scene();
		this._scene.fog = new Fog(0x000000, 0, 1000);

		this._camera = new PerspectiveCamera(45, 1, 1, 1000);
		this._camera.position.z = 150;

		this._pointLight = new PointLight(0xFFFFFF, .75, 250, 2);
		this._pointLight.position.set(0, 50, 50);
		this._pointLight.castShadow = true;
		this._scene.add(this._pointLight);

		this._ambientLight = new AmbientLight(0xFFFFFF, .5);
		this._scene.add(this._ambientLight);

		this._renderer = new WebGLRenderer();
		this._renderer.shadowMap.enabled = true;
		this._renderer.shadowMap.type = PCFSoftShadowMap;
		this._element.appendChild(this._renderer.domElement);
	}
}

const cubeDefaults = {
	width: 25,
	height: 25,
	depth: 25,
	color: 0xFFFFFF
};

// https://gist.github.com/bhollis/7686441
const checkeredPlane = (width = 100, height = 100, segments = 10) => {
	const geometry = new PlaneGeometry(width, height, segments, segments);
	const materialEven = new MeshLambertMaterial({color: 0xCCCCCC});
	const materialOdd = new MeshLambertMaterial({color: 0xFFFFFF});
	const materials = [materialEven, materialOdd];

	for (let x = 0; x < segments; x++) {
		for (let y = 0; y < segments; y++) {
			const i = x * segments + y;
			const j = 2 * i;
			geometry.faces[j].materialIndex = geometry.faces[j + 1].materialIndex = (x + y) % 2
		}
	}

	return new Mesh(geometry, new MeshFaceMaterial(materials))
};

const vistexLogo = () => {
	const shape = new Shape();
	shape.moveTo(11.2, 44.0);
	shape.lineTo(33.6, 44.0);
	shape.lineTo(16.7, 27.2);
	shape.lineTo(6.41, 0.00);
	shape.lineTo(-8.19, 0.00);
	shape.lineTo(-18.4, 27.2);
	shape.lineTo(-33.6, 27.2);
	shape.lineTo(-33.6, 44.0);
	shape.lineTo(-13.0, 44.0);
	shape.lineTo(-1.01, 10.5);
	shape.lineTo(11.2, 44.0);

	const geometry = new ExtrudeGeometry(shape, {
		amount: 8,
		bevelEnabled: true,
		bevelSegments: 2,
		steps: 2,
		bevelSize: 1,
		bevelThickness: 1
	});

	const material = new MeshLambertMaterial({color: 0x003056});

	return new Mesh(geometry, material);
};
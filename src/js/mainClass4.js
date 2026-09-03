import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const backgroundColor = 0x191970;
scene.background = new THREE.Color(backgroundColor);


const renderer = new THREE.WebGLRenderer();

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);


// CÁMARA

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

camera.position.set(0, 5, 25);

controls.update();


// LUZ

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(5, 10, 7);
scene.add(light);


// PLANETAS

const shapeData = [

    {
        name: 'Sol',
        geometry: new THREE.SphereGeometry(6, 50, 50),
        color: 0xffd700,
        posX: 0
    },

    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry(3.8, 40, 40),
        color: 0x888888,
        posX: 11.5
    },

    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry(3.2, 40, 40),
        color: 0xffa500,
        posX: 20
    },

    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry(2.5, 35, 35),
        color: 0x0000ff,
        posX: 26.5
    },

    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry(2, 32, 32),
        color: 0xff0000,
        posX: 32.5
    },

    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry(2, 30, 30),
        color: 0xc28b62,
        posX: 40.5
    },

    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry(1.6, 25, 25),
        color: 0xffd27f,
        posX: 60
    },

    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry(1.2, 20, 20),
        color: 0x66ffff,
        posX: 70
    },

    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry(1, 15, 15),
        color: 0x3333ff,
        posX: 80
    }

];


const meshes = [];


// PLANETAS

shapeData.forEach((shapeData) => {

    const material = new THREE.MeshStandardMaterial({
        color: shapeData.color
    });

    const mesh = new THREE.Mesh(
        shapeData.geometry,
        material
    );

    mesh.position.x = shapeData.posX;

    scene.add(mesh);
    meshes.push(mesh);

});


// ANILLO

const ringGeometry = new THREE.RingGeometry(1.5, 3, 32);
const ringMaterial = new THREE.MeshBasicMaterial({color: 0xd2b48c,side: THREE.DoubleSide});

const ring = new THREE.Mesh(ringGeometry,ringMaterial);
ring.rotation.x = Math.PI / 2;
ring.position.x = 45;
scene.add(ring);

// ANIMACIÓN

function animate() {

    controls.update();
    renderer.render(scene, camera);

}
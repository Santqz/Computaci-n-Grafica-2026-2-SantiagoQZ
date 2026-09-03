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
        color: 0xffff00,
        posX: 0
    },

    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry(3.8, 40, 40),
        color: 0x555555,
        posX: 11.5
    },

    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry(3.2, 40, 40),
        color: 0xcc6600,
        posX: 20
    },

    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry(2.5, 35, 35),
        color: 0x00aa00,
        posX: 26.5
    },

    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry(2, 32, 32),
        color: 0xaa0000,
        posX: 31.5
    },

    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry(2, 30, 30),
        color: 0x996633,
        posX: 36.5
    },

    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry(1.6, 25, 25),
        color: 0xccaa66,
        posX: 42
    },

    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry(1.2, 20, 20),
        color: 0x33cccc,
        posX: 48
    },

    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry(1, 15, 15),
        color: 0xc71585,
        posX: 53
    }

];


const meshes = [];


// PLANETAS

shapeData.forEach((shapeData) => {
    let material;
    // SOL
    if (shapeData.name === 'Sol') {material = new THREE.MeshBasicMaterial({color: 0xffff00});

    } else {

        material = new THREE.MeshStandardMaterial({color: shapeData.color,roughness: 0.8,metalness: 0.1});

    }

    const mesh = new THREE.Mesh(
        shapeData.geometry,
        material
    );

    mesh.position.x = shapeData.posX;

    scene.add(mesh);
    meshes.push(mesh);

});

// ANILLOS

const ringMaterial = new THREE.MeshBasicMaterial({color: 0xb89b63,side: THREE.DoubleSide});
const ring1 = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.8, 64),ringMaterial);
const ring2 = new THREE.Mesh(new THREE.RingGeometry(1.85, 2.2, 64),ringMaterial);

ring1.rotation.x = Math.PI / 2;
ring2.rotation.x = Math.PI / 2;

ring1.position.x = 42;
ring2.position.x = 42;

scene.add(ring1);
scene.add(ring2);

// VELOCIDAD PLANETAS

const velocidades = [
    0,       // Sol
    0.0010,  // Mercurio
    0.0008,  // Venus
    0.0007,  // Tierra
    0.0006,  // Marte
    0.0005,  // Jupiter
    0.0004,  // Saturno
    0.0003, // Urano
    0.0002   // Neptuno
];
// ÁNGULO PLANETAS

const angulos = [
    0, // Sol
    0, // Mercurio
    0, // Venus
    0, // Tierra
    0, // Marte
    0, // Jupiter
    0, // Saturno
    0, // Urano
    0  // Neptuno
];

// ANIMACIÓN

function animate(time) {
    controls.update();

    // MOVIMIENTO PLANETAS

    meshes.forEach((mesh, index) => {

        if (index === 0) return;
        angulos[index] += velocidades[index] * 10;
        const anguloDiscontinuo = Math.floor(angulos[index] * 20) / 20;

        const distancia = shapeData[index].posX;
        mesh.position.x = Math.cos(anguloDiscontinuo) * distancia;
        mesh.position.z =  Math.sin(anguloDiscontinuo) * distancia;

    });


    // MOVER ANILLOS 

    ring1.position.x = meshes[6].position.x;
    ring1.position.z = meshes[6].position.z;

    ring2.position.x = meshes[6].position.x;
    ring2.position.z = meshes[6].position.z;

    // MOSTRAR

    renderer.render(scene, camera);

}
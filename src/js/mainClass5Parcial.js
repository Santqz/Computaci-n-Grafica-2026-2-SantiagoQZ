import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x191970);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 12, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 9, 0);
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(10, 20, 15);
light.castShadow = true;
scene.add(light);

// PISO

const pisoGeometry = new THREE.BoxGeometry(35, 0.5, 20);
const pisoMaterial = new THREE.MeshStandardMaterial({color: 0x64748b});
const piso = new THREE.Mesh(pisoGeometry, pisoMaterial);
piso.position.y = -0.25;
piso.receiveShadow = true;

scene.add(piso);

// DATOS DE LA RUEDA

const numCabinas = 8;
const radioRueda = 6;
const centroX = 0;
const centroY = 9;

// SOPORTE

const soporteIzquierdo = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 10, 0.7),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
);

soporteIzquierdo.position.set(-2.5, 4.5, 0);
soporteIzquierdo.rotation.z = -Math.PI / 6;
scene.add(soporteIzquierdo);


const soporteDerecho = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 10, 0.7),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
);

soporteDerecho.position.set(2.5, 4.5, 0);
soporteDerecho.rotation.z = Math.PI / 6;
scene.add(soporteDerecho);


const baseIzquierdo = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.7, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x64748b })
);

baseIzquierdo.position.set(-2.5, 0.35, 0);
scene.add(baseIzquierdo);


const baseDerecho = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.7, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x64748b })
);

baseDerecho.position.set(2.5, 0.35, 0);
scene.add(baseDerecho);


const centroSoporte = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.6, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xFFE600 })
);

centroSoporte.position.set(0, 5, 0);
scene.add(centroSoporte);


// EJE

const ejeG = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const ejeM = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.8,
    roughness: 0.3
});

const eje = new THREE.Mesh(ejeG, ejeM);

eje.rotation.x = Math.PI / 2;
eje.position.set(centroX, centroY, 0);
eje.castShadow = true;

scene.add(eje);


// RUEDA

const circulo = new THREE.Group();
circulo.position.set(centroX, centroY, 0);
scene.add(circulo);


// RUEDAS

const ruedaG = new THREE.TorusGeometry(
    radioRueda,
    0.25,
    16,
    64
);

const ruedaM = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.5,
    metalness: 0.5
});

const ruedaI = new THREE.Mesh(ruedaG, ruedaM);
ruedaI.position.z = -1;
ruedaI.castShadow = true;
circulo.add(ruedaI);


const ruedaD = new THREE.Mesh(ruedaG, ruedaM);
ruedaD.position.z = 1;
ruedaD.castShadow = true;
circulo.add(ruedaD);

const radioM = new THREE.MeshStandardMaterial({color: 0xcbd5e1, roughness: 0.5, metalness: 0.4});
const numBarras = 4;

for (let i = 0; i < numBarras; i++) {

    const angulo = (i / numBarras) * Math.PI * 2;
    const distanciaCentro = 0.1;
    const largo = radioRueda - distanciaCentro;

    const x = Math.cos(angulo) * (distanciaCentro + largo / 2);
    const y = Math.sin(angulo) * (distanciaCentro + largo / 2);
    const radioG = new THREE.BoxGeometry(0.30, largo, 0.30);
    const radioI = new THREE.Mesh(radioG, radioM);

    radioI.position.set(x, y, -1);
    radioI.rotation.z = -angulo + Math.PI / 2;
    radioI.castShadow = true;
    circulo.add(radioI);

    const radioD = new THREE.Mesh(radioG, radioM);

    radioD.position.set(x, y, 1);
    radioD.rotation.z = -angulo + Math.PI / 2;
    radioD.castShadow = true;

    circulo.add(radioD);
}

// CENTRO

const centroG = new THREE.CylinderGeometry(0.9, 0.9, 0.8, 32);
const centroM = new THREE.MeshStandardMaterial({color: 0xfffff, metalness: 0.6, roughness: 0.3});

const centro = new THREE.Mesh(centroG, centroM);

centro.rotation.x = Math.PI / 2;
centro.castShadow = true;

circulo.add(centro);


// CABINAS

const cabinas = [];

for (let i = 0; i < numCabinas; i++) {

    const angulo = (i / numCabinas) * Math.PI * 2;

    const x = Math.cos(angulo) * radioRueda;
    const y = Math.sin(angulo) * radioRueda;

    const cabina = new THREE.Group();

    cabina.position.set(x, y, 0);

    circulo.add(cabina);
    cabinas.push(cabina);

    const CapsulaG = new THREE.BoxGeometry(1.4, 1, 1.2);
    const CapsulaM = new THREE.MeshStandardMaterial({color: 0xf59e0b, roughness: 0.7, metalness: 0.1});
    const cesta = new THREE.Mesh(CapsulaG, CapsulaM);

    cesta.position.y = -0.2;
    cesta.castShadow = true;
    cesta.receiveShadow = true;

    cabina.add(cesta);


    // TECHO

    const techoG = new THREE.ConeGeometry(0.9, 0.6, 4);
    const techoM = new THREE.MeshStandardMaterial({color: 0xef4444, roughness: 0.6, metalness: 0.1});
    const techo = new THREE.Mesh(techoG, techoM);

    techo.position.y = 0.6;
    techo.castShadow = true;
    cabina.add(techo);
}


// VELOCIDAD

let velocidad = 0.01;


// ANIMACIÓN

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    circulo.rotation.z += velocidad;

    cabinas.forEach((cabina) => {
        cabina.rotation.z = -circulo.rotation.z;
    });

    renderer.render(scene, camera);
}

animate();


// REDIMENSIONAR

function redimensionar() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}

redimensionar();

window.addEventListener('resize', redimensionar);
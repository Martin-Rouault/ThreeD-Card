import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1117);

// Lights
const light = new THREE.PointLight("white", 2);
light.position.set(0, 1, 1);

// Font
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const texts = [
        { text: "Martin Rouault", size: 0.1, position: [-0.8, 0.25, 0] },
        { text: "Web Developer", size: 0.06, position: [-0.8, 0.1, 0] },
        { text: "Paris, France", size: 0.045, position: [0.5, 0.3, 0] },
        {
            text: "If you no longer for a gap that exists \n you are no longer a racing driver.",
            size: 0.03,
            position: [-0.8, -0.35, 0],
        },
    ];

    texts.forEach(({ text, size, position }) => {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: size,
            depth: 0.01,
            curveSegments: 7,
        });
        const meshes = new THREE.Mesh(textGeometry, textMaterial);
        meshes.position.set(...position);
        scene.add(meshes);
    });
});

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.1, 0.01),
    new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.5,
        metalness: 0.6,
    })
);

cube.position.set(0, 0, 0);
cube.material.color.set(0x161b22);

scene.add(cube, light);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();

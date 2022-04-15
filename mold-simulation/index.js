/*
plans ----

modify the mesh to create a log looking thing 
add mushrooms

order of operations ----

select the points that will be affected for log maker
send regions to be operated on as if they were planes
maybe a plane would be a better starting place
this could also be made in blender without a three.js algorithm

--- this one is the important one ------
mushroom grower needs the four points to extrude from
l system where only the endpoints matter
the mushroom fans out from a single square
it's a flat fan with a some ripples or curling

extrusion algorithm


 or

 start with the 4 points
 generate 2, 4, 6, or 8 points from those 4
 generate the edgepiece along the outside
 generate the triangles on the top and bottom
 return the points for each of the end faces


do everything in blender?
make the mushrooms separate from the log






*/
//https://cdn.skypack.dev/three
import * as THREE from '../deps/three.js';
import { OrbitControls } from '../deps/OrbitControls.js';
import { GUI } from '../deps/dat.gui.min.js';
import  { GLTFLoader } from '../deps/GLTFLoader.js';
import "../deps/helpers.js";
import MushroomGenerator from './MushroomGenerator.js';

//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
camera.position.z = 300;
// camera.scale.set(0.01, 0.01, 0.01);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//

scene.add( new THREE.AmbientLight( 0x777777 ) );

const light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
light1.position.set( 1, 1, 1 );
scene.add( light1 );

const light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
light2.position.set( 0, - 1, 0 );
scene.add( light2 );
// const geometry = new THREE.BufferGeometry();

const myGenerator = new MushroomGenerator();
const pointA = new THREE.Vector3(0, -1, -1);
const pointB = new THREE.Vector3(0, 1, -1);
const pointC = new THREE.Vector3(0, -1, 1);
const pointD = new THREE.Vector3(0, 1, 1);
const pointList = [pointA, pointB, pointC, pointD];
const mushyAngle = 0;
const numIter = 4;
const mushy = myGenerator.createMushroom(pointList, mushyAngle, numIter);
scene.add( mushy );

const guiControls = new function() {
    this.kRule = 'J',
    this.lRule = 'III',
    this.iRule = 'KK',
    this.kAngle = 90,
    this.lAngle = 90,
    this.iAngle = 90
}

const gui = new GUI();
const animationFolder = gui.addFolder('Animation');
animationFolder.add(guiControls, 'kRule');
animationFolder.add(guiControls, 'lRule');
animationFolder.add(guiControls, 'iRule');
animationFolder.add(guiControls, 'kAngle', 45, 135);
animationFolder.add(guiControls, 'lAngle', 60, 135);
animationFolder.add(guiControls, 'iAngle', 60, 135);
// animationFolder.onchange(animate);
animationFolder.open();

const controls = new OrbitControls(camera, renderer.domElement);
window.addEventListener( 'resize', onWindowResize );

function animate() {
    requestAnimationFrame( animate );
    // mesh.rotation.x += 0.01;
    // mesh.rotation.z += 0.01;
    controls.update();
    renderer.render( scene, camera );
};

animate();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

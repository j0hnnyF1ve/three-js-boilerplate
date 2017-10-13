( (THREE) => {
  "use strict";

window.addEventListener("keydown", keydownHandler);
window.addEventListener("mousemove", mousemoveHandler);
window.addEventListener("load", init, false);

var scene, camera, renderer, controls; // basics
var ambientLight, pointLights = []; // lights
var rotationControls, colorControls; // dat.gui controls

// custom objects
var cube;


function init() {
  createScene();
  createCamera( window.innerWidth / window.innerHeight );
  createLights();

  cube = createCube();
  scene.add(cube);

  createRenderer( window.innerWidth, window.innerHeight );

  setupControls()
  setupGui(cube);
  animate();
}

// CUSTOM FUNCTIONS ------------------------------------------------------------
function createCube() {
  var geometry  = new THREE.BoxGeometry( 5, 5, 5 );
  var material  = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0x282222 } );
  var newCube   = new THREE.Mesh( geometry, material );
  scene.add(newCube);

  return newCube;
}

// SETUP AND ANIMATION ---------------------------------------------------------

function setupControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function setupGui(obj) {
  rotationControls = {
    x: 0.01,
    y: 0.01,
    z: 0.00
  }

  colorControls = {

    color: obj.material.color.getHex(),
    emissive: obj.material.emissive.getHex(),
    specular: obj.material.specular.getHex()
  }

  var gui = new dat.GUI();
  var folder = gui.addFolder("Rotation");

  folder.add(rotationControls, "x", -0.05, 0.05, 0.001).name("x");
  folder.add(rotationControls, "y", -0.05, 0.05, 0.001).name("y");
  folder.add(rotationControls, "z", -0.05, 0.05, 0.001).name("z");

  folder = gui.addFolder("Color");

  var color = new THREE.Color();

  folder.addColor(colorControls, "color")
    .onChange(_handleColor(obj.material.color))
    .name("Material Color");


  folder.addColor(colorControls, "emissive")
    .onChange(_handleColor(obj.material.emissive))
    .name("Emissive");

  folder.addColor(colorControls, "specular")
    .onChange(_handleColor(obj.material.specular))
    .name("Specular");

  function _handleColor(obj) {
    if(!obj.getHex || !obj.setHex) {
      console.warn(obj + " control not set, missing getHex/setHex methods");
      return function() { };
    }

    return function(value) {
      if( typeof value === "string" ) { value = value.replace('#', '0x'); }
      obj.setHex(value);
    }
  }

}

// try to define sub routines or objects that animate can call, rather than adding tons
// of code to animate
function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += rotationControls.x;
  cube.rotation.y += rotationControls.y;
  cube.rotation.z += rotationControls.z;

  renderer.render( scene, camera );
}


// BASIC FUNCTIONS ---------------------------------------------------------------
function createScene() {
  scene = new THREE.Scene();
}

function createCamera(aspectRatio) {
  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 500);
  camera.position.z = 10;
}

function createLights() {
  ambientLight = new THREE.AmbientLight(0x999999, 0.1);
  scene.add(ambientLight);

  pointLights[0] = new THREE.PointLight(0xffffff, 1, 100);
  pointLights[0].position.set(5, 5, 10);
  scene.add(pointLights[0]);

  pointLights[1] = new THREE.PointLight(0x999999, 0.5, 100);
  pointLights[1].position.set(-5, 5, -10);
  scene.add(pointLights[1]);

  var sphereSize = 1, pointLightHelper;
  for(let pointLight of pointLights) {
    pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    scene.add(pointLightHelper);
  }
}


function createRenderer(width, height) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );
}

function keydownHandler(event) {
//  console.log(event);
}

function mousemoveHandler(event) {
//  console.log(event);
}

} )(THREE);

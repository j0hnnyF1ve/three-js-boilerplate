( (THREE) => {
  "use strict";

window.addEventListener("keydown", keydownHandler);
window.addEventListener("mousemove", mousemoveHandler);
window.addEventListener("load", init, false);

var scene, camera, renderer, cube;


function init() {
  createScene();
  createCamera( window.innerWidth / window.innerHeight );
  cube = createCube();
  createRenderer( window.innerWidth/1.5, window.innerHeight/1.5 );
  animate();

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    renderer.render( scene, camera );
  }
}

function createScene() {
  scene = new THREE.Scene();
}

function createCamera(aspectRatio) {
  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 5;
}

function createCube() {
  var geometry  = new THREE.BoxGeometry( 1, 1, 1 );
  var material  = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var newCube   = new THREE.Mesh( geometry, material );
  scene.add(newCube);

  return newCube;
}

function createRenderer(width, height) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );
}

function keydownHandler(event) {
  console.log(event);
}

function mousemoveHandler(event) {
  console.log(event);
}

} )(THREE);

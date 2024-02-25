// Scene() constructor creates a new scene, which represents the whole 3D world
// we are trying to display. It takes no parameters. 
const scene = new THREE.Scene(); 

// Next, we need a camera so we can see the scene. In 3D imagery terms, the camera
// represents a viewer's position in the world. To create a camera, we need to define
// a PerspectiveCamera object. The constructor takes four args: field of view(in degrees),
// aspect ratio, near clipping plane - measured in units, and far clipping pl, measured in units. 
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1, // meters
  1000,
);

// we also set the camera's position to be 5 distance units out of the Z axis. 
// Which, like in CSS, is out of the screen towards you, the viewer.
camera.position.z = 5;

// The third final ingredient is the renderer. This is an object that renders a given
// scene, as viewed through a given camera. We create a new WebGLRenderer object, 
// but not use it until later. It takes no args, and is configured through its methods.
const renderer = new THREE.WebGLRenderer();
// set size at which renderer will draw the camera's view of the scene. 
renderer.setSize(window.innerWidth, window.innerHeight);
// domElement is a canvas element that the renderer uses to display the scene to us.
// now, anything the renderer draws will be displayed in our window
document.body.appendChild(renderer.domElement); 

// now, we want to create the cube we'll display on the canvas.
// first, we create cube global varible so we can access so we can access
// our cube from anywhere in our code.
let cube;
// next, we create a new TextureLoader object, then call load() on it. load() takes
// two args in this case: the texture we want to load (our PNG), and the callback
// function to run when the texture has loaded.
const loader = new THREE.TextureLoader();

loader.load("metal003.png", (texture) => {
  // use properties of the texture object to specify that we want a 2 x 2 repeat of
  // the image wrapped around all sides of the cube.
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  // next, we create a BoxGeometry object, which will define the shape of our cube, and
  // a MeshLambertMaterial object, which will define the material of our cube, and bring
  // them together in a Mesh object to create our cube. An object typically requires a 
  // geometry (what shape it is) and a material (what its surface looks like) to be created.
  const geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
  const material = new THREE.MeshLambertMaterial({ map: texture });
  cube = new THREE.Mesh(geometry, material);

  // finally, we add the cube to the scene, so it will be rendered when we call renderer.render()
  // then we call our draw() function to start off the animation.
  scene.add(cube);
  draw();
});

// Before we can draw our cube, we need to add some light to the scene.
// an AmbientLight object is a light that shines evenly on all objects in the scene.
// it lightens the whole scene up a bit, like the sun when you're outside.
const light = new THREE.AmbientLight("rgb(255,255,255)"); // soft white light
scene.add(light);
// a SpotLight object is a light that shines from a specific direction onto a specific area.
// like a flashlight or a torch (or a spotlight, in fact). A directional beam of light.
const spotLight = new THREE.SpotLight("rgb(255,255,255)");
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);

// lastly, we add our draw() function, which will be called every frame to draw the scene.
function draw() {
  cube.rotation.x += 0.01; // rotate cube on the x-axis
  cube.rotation.y += 0.01; // rotate cube on the y-axis
  renderer.render(scene, camera); // draw the scene

  requestAnimationFrame(draw); // call the draw function again, recursively. 
}
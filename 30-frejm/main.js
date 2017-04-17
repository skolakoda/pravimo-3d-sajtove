/* global THREE */

const WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight
const VIEW_ANGLE = 50,
  NEAR = 1,
  FAR = 1000

// skalira frejm za zid
const wallWidth = 360
const wallHeight = 180
const aspectRatio = wallHeight / wallWidth

/* INIT */

const scene = new THREE.Scene()
const cssScene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, WIDTH / HEIGHT, NEAR, FAR)
camera.position.set(0, 150, 400)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0

const rendererCSS = new THREE.CSS3DRenderer()
rendererCSS.setSize(WIDTH, HEIGHT)
document.body.appendChild(rendererCSS.domElement)
rendererCSS.domElement.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)

// FLOOR

const floorTexture = new THREE.ImageUtils.loadTexture('../assets/kamen.jpg')
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.set(10, 10)

const floorMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  side: THREE.DoubleSide
})
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = Math.PI / 2

// PAGE

const wallMaterial = new THREE.MeshBasicMaterial({
  opacity: 0,
  side: THREE.DoubleSide
})

const wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight)
const wall = new THREE.Mesh(wallGeometry, wallMaterial)
wall.position.y += wallHeight / 2

const iframe = document.createElement('iframe')
iframe.src = 'http://www.skolakoda.org/'
iframe.width = 1024
iframe.height = iframe.width * aspectRatio

const page = new THREE.CSS3DObject(iframe)
page.position = wall.position
page.scale.x /= iframe.width / wallWidth
page.scale.y /= iframe.width / wallWidth

// ADD

scene.add(camera)
scene.add(wall)
scene.add(floor)
cssScene.add(page)

/* FUNCTIONS */

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  rendererCSS.render(cssScene, camera)
  renderer.render(scene, camera)
}

animate()

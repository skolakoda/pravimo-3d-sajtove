/* global THREE */

const WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight
const VIEW_ANGLE = 50,
  NEAR = 1,
  FAR = 1000

/* INIT */

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, WIDTH / HEIGHT, NEAR, FAR)
camera.position.set(0, 150, 400)
scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = 0

const rendererCSS = new THREE.CSS3DRenderer()
rendererCSS.setSize(WIDTH, HEIGHT)
document.body.appendChild(rendererCSS.domElement)
rendererCSS.domElement.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)

const floorTexture = new THREE.ImageUtils.loadTexture('kamen.jpg')
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.set(10, 10)
const floorMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  side: THREE.DoubleSide
})
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.position.y = -100
floor.rotation.x = Math.PI / 2
scene.add(floor)

const planeMaterial = new THREE.MeshBasicMaterial({
  opacity: 0,
  side: THREE.DoubleSide
})
const planeWidth = 360
const planeHeight = 180
const aspectRatio = planeHeight / planeWidth
const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.position.y += planeHeight / 2
scene.add(planeMesh)

const iframe = document.createElement('iframe')
iframe.src = 'http://www.skolakoda.org/'
iframe.width = 1024
iframe.height = iframe.width * aspectRatio

const cssObject = new THREE.CSS3DObject(iframe)
cssObject.position = planeMesh.position
cssObject.rotation = planeMesh.rotation
cssObject.scale.x /= iframe.width / planeWidth
cssObject.scale.y /= iframe.width / planeWidth

const cssScene = new THREE.Scene()
cssScene.add(cssObject)

/* FUNCTIONS */

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  rendererCSS.render(cssScene, camera)
  renderer.render(scene, camera)
}

animate()

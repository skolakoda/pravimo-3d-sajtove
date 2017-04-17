/* global THREE */

const WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight
const VIEW_ANGLE = 50,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 1,
  FAR = 1000

const videoWidth = 480
const videoHeight = 200

/* INIT */

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
camera.position.set(58, 27, 190)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)
document.getElementById('root').appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)

const floorTexture = new THREE.ImageUtils.loadTexture('../assets/lava.jpg')
floorTexture.repeat.set(5, 5)
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping

const floorMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  side: THREE.DoubleSide
})

const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = Math.PI / 2
floor.position.y = -25

const video = document.createElement('video')
video.src = '../assets/sintel.ogv'
video.load()
video.play()

const videoCanvas = document.createElement('canvas')
videoCanvas.width = videoWidth
videoCanvas.height = videoHeight
const videoCanvasContext = videoCanvas.getContext('2d')

const videoTexture = new THREE.Texture(videoCanvas)
const movieMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  overdraw: true,
  side: THREE.DoubleSide
})
const movieGeometry = new THREE.PlaneGeometry(videoWidth / 2, videoHeight / 2, 0, 0)
const movieScreen = new THREE.Mesh(movieGeometry, movieMaterial)
movieScreen.position.y = 25

scene.add(camera)
scene.add(floor)
scene.add(movieScreen)

/* FUNCTIONS */

function playVideo() {
  if (video.readyState !== video.HAVE_ENOUGH_DATA) return
  videoCanvasContext.drawImage(video, 0, 0)
  if (videoTexture) videoTexture.needsUpdate = true
}

function update() {
  requestAnimationFrame(update)
  playVideo()
  controls.update()
  renderer.render(scene, camera)
}

/* EXEC */

update()

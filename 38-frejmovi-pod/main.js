/* global THREE */

// ograniciti kameru
// staviti pod

const bojaPozadine = 0xECF8FF

/* KLASE */

class Frame extends THREE.CSS3DObject {
  constructor(width, height, position, rotation, url) {
    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.width = width
    iframe.height = height
    super(iframe)
    Object.assign(this.position, position)
    Object.assign(this.rotation, rotation)
  }
}

class Wall extends THREE.Mesh {
  constructor(w, h, position, rotation) {
    super(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        opacity: 0,
        side: THREE.DoubleSide
      })
    )
    Object.assign(this.position, position)
    Object.assign(this.rotation, rotation)
  }
}

class CSS3DRenderer extends THREE.CSS3DRenderer {
  constructor() {
    super()
    this.setSize(window.innerWidth, window.innerHeight)
    this.domElement.style.position = 'absolute'
    this.domElement.style.top = 0
  }
}

class WebGLRenderer extends THREE.WebGLRenderer {
  constructor() {
    super({alpha:true})
    this.setClearColor(bojaPozadine)
    this.setSize(window.innerWidth, window.innerHeight)
    this.domElement.style.position = 'absolute'
    this.domElement.style.top = 0
  }
}

/* INIT */

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  5000)
camera.aspect = window.innerWidth / window.innerHeight
camera.position.set(708, 2, 2503)

const controls = new THREE.OrbitControls(camera)
controls.maxPolarAngle = Math.PI / 2
controls.minPolarAngle = Math.PI / 2 - 0.3

const glRenderer = new WebGLRenderer()
const cssRenderer = new CSS3DRenderer()

const glScene = new THREE.Scene()
const cssScene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0x555555)
const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(-.5, .5, -1.5).normalize()

const kupa = new THREE.Mesh(
  new THREE.CylinderGeometry(0, 200, 300, 20, 4),
  new THREE.MeshNormalMaterial()
)
kupa.position.set(0, -300, 400)

const kocka = new THREE.Mesh(
  new THREE.BoxGeometry(200, 200, 200),
  new THREE.MeshNormalMaterial()
)
kocka.position.set(-300, -300, 400)

const lopta = new THREE.Mesh(
  new THREE.SphereGeometry(100, 128, 128),
  new THREE.MeshNormalMaterial()
)
lopta.position.set(500, -300, 400)

/* ADD */

glScene.add(kupa)
glScene.add(kocka)
glScene.add(lopta)
glScene.add(ambientLight)
glScene.add(directionalLight)

document.querySelector('#renderer')
  .appendChild(cssRenderer.domElement)
  .appendChild(glRenderer.domElement)

/* FUNCTIONS */

function update() {
  controls.update()
  glRenderer.render(glScene, camera)
  cssRenderer.render(cssScene, camera)
  requestAnimationFrame(update)
}

function create3dPage(w, h, position, rotation, url) {
  const wall = new Wall(w, h, position, rotation)
  const cssObject = new Frame(w, h, position, rotation, url)
  glScene.add(wall)
  cssScene.add(cssObject)
}

/* EXEC */

create3dPage(
  1000, 1000,
  new THREE.Vector3(-1050, 0, 400),
  new THREE.Vector3(0, 45 * Math.PI / 180, 0),
  'http://skolakoda.org/')

create3dPage(
  900, 1000,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  'http://skolakoda.org/')

create3dPage(
  1000, 1000,
  new THREE.Vector3(1050, 0, 400),
  new THREE.Vector3(0, -45 * Math.PI / 180, 0),
  'http://skolakoda.org/')

update()
